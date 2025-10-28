import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import Ionicons from 'react-native-vector-icons/Ionicons';

const API_KEY = '598a586f770f0053a82cd327bce1c774';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>;

export default function MovieDetailScreen({ route }: Props) {
  const { id } = route.params;
  const [movie, setMovie] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      setMovie(data);
      setLoading(false);
    };
    fetchMovieDetail();
  }, [id]);

  if (loading || !movie)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.text}>Loading movie detail...</Text>
      </View>
    );

  return (
    <ImageBackground
      source={require('../../assets/marvel1-bg.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.overlay}>
        {movie.backdrop_path && (
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` }}
            style={styles.banner}
          />
        )}
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.subtitle}>
          <Ionicons name="calendar-outline" size={14} /> {movie.release_date} | ⭐{' '}
          {movie.vote_average?.toFixed(1)}
        </Text>
        <Text style={styles.heading}>Overview</Text>
        <Text style={styles.body}>{movie.overview || 'No description available.'}</Text>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    padding: 16,
    flexGrow: 1,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { color: '#ccc', marginTop: 8 },
  banner: { width: '100%', height: 220, borderRadius: 12, marginBottom: 12 },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: '#E50914',
    textShadowRadius: 10,
  },
  subtitle: { color: '#aaa', marginVertical: 8 },
  heading: { fontSize: 18, fontWeight: '700', color: '#E50914', marginTop: 16 },
  body: { color: '#ddd', lineHeight: 22 },
});
