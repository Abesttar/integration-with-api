import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from "react-native";

export default function SongScreen() {
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.deezer.com/search?q=eminem")
      .then((res) => res.json())
      .then((data) => {
        setSongs(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#007AFF" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.album.cover_small }} style={styles.image} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.artist.name}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 8,
  },
  image: { width: 50, height: 50, borderRadius: 8 },
  title: { fontWeight: "bold", fontSize: 14 },
});
