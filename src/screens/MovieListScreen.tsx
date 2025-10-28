import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MovieStackParamList } from '../navigation/MovieStackNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

const API_KEY = '598a586f770f0053a82cd327bce1c774';
const MARVEL_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_companies=420&language=en-US`;

export default function MovieListScreen() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<MovieStackParamList>>();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setError(null);
        const res = await fetch(MARVEL_API_URL);
        const data = await res.json();
        if (Array.isArray(data.results)) {
          setMovies(data.results);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.text}>Loading Marvel Movies...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load movies: {error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/marvel-bg.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('MovieDetail', {
                  id: item.id.toString(),
                  title: item.title,
                })
              }
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.image}
              />
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.year}>
                  <Ionicons name="calendar-outline" size={14} /> {item.release_date}
                </Text>
                <Text style={styles.overview} numberOfLines={3}>
                  {item.overview || 'No description available.'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    padding: 10,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { color: '#fff', fontSize: 16, marginTop: 10 },
  error: { color: '#f87171', fontSize: 14, textAlign: 'center', padding: 10 },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(26,26,26,0.9)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E50914',
  },
  image: { width: 100, height: 140, borderRadius: 8 },
  info: { flex: 1, marginLeft: 10 },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#fff',
    textShadowColor: '#E50914',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  year: { color: '#ccc', fontSize: 13, marginVertical: 4 },
  overview: { color: '#aaa', fontSize: 12, lineHeight: 16 },
});
