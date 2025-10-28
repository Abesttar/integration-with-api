import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";
import LinearGradient from "react-native-linear-gradient";

const { width } = Dimensions.get("window");

export default function SongListScreen() {
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setError(null);
        const res = await fetch(
          "https://itunes.apple.com/search?term=andmesh&entity=song&limit=20"
        );
        const data = await res.json();
        if (Array.isArray(data.results)) {
          setSongs(data.results);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#A855F7" />
        <Text style={styles.text}>Loading Andmesh songs...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load songs: {error}</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#D8B4FE", "#93C5FD"]} style={{ flex: 1 }}>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.trackId.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("SongDetail", {
                id: item.trackId.toString(),
                title: item.trackName,
              })
            }
          >
            <Image source={{ uri: item.artworkUrl100 }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.trackName}</Text>
              <Text style={styles.artist}>{item.artistName}</Text>
              <Text style={styles.album}>{item.collectionName}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { color: "#fff", fontSize: 16, marginTop: 10 },
  error: { color: "#ef4444", textAlign: "center", fontSize: 14, marginTop: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  image: { width: 80, height: 80, borderRadius: 12 },
  info: { flex: 1, marginLeft: 12, justifyContent: "center" },
  title: { fontSize: 16, fontWeight: "700", color: "#1E3A8A" },
  artist: { fontSize: 13, color: "#6B21A8", marginTop: 2 },
  album: { fontSize: 12, color: "#4B5563", marginTop: 2 },
});
