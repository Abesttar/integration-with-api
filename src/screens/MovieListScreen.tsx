// src/screens/MovieListScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../App";

type Movie = {
  id: string;
  title: string;
  release_date: string;
  rt_score: string;
};

export default function MovieListScreen() {
  // gunakan NavigationProp yang mengacu ke RootStackParamList
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ghibliapi.vercel.app/films")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              // sekarang TypeScript mengenali 'MovieDetail' sebagai route valid
              navigation.navigate("MovieDetail", { id: item.id, title: item.title })
            }
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text>Release Year: {item.release_date}</Text>
            <Text>Rating: {item.rt_score}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#f2f2f2",
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
});
