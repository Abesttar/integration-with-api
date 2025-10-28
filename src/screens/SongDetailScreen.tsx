import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LinearGradient from "react-native-linear-gradient";
import type { RootStackParamList } from "../../App";

const { width } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "SongDetail">;

export default function SongDetailScreen({ route }: Props) {
  const { id } = route.params;
  const [song, setSong] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongDetail = async () => {
      try {
        const res = await fetch(
          `https://itunes.apple.com/lookup?id=${id}&entity=song`
        );
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setSong(data.results[0]);
        } else {
          setError("Song not found");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSongDetail();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#A855F7" />
        <Text style={styles.text}>Loading song detail...</Text>
      </View>
    );
  }

  if (error || !song) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error ?? "Song not found"}</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#E9D5FF", "#C7D2FE"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {song.artworkUrl100 && (
          <Image source={{ uri: song.artworkUrl100 }} style={styles.image} />
        )}

        <Text style={styles.title}>{song.trackName}</Text>
        <Text style={styles.artist}>{song.artistName}</Text>

        <View style={styles.detailBox}>
          <Text style={styles.label}>Album</Text>
          <Text style={styles.value}>{song.collectionName}</Text>

          <Text style={styles.label}>Genre</Text>
          <Text style={styles.value}>{song.primaryGenreName}</Text>

          <Text style={styles.label}>Release Date</Text>
          <Text style={styles.value}>
            {new Date(song.releaseDate).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.previewBox}>
          <Text style={styles.previewText}>
            🎧 {song.previewUrl
              ? "Tap to listen on Apple Music or iTunes!"
              : "No preview available."}
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { color: "#7C3AED", marginTop: 8 },
  error: { color: "#ef4444", fontWeight: "600" },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E3A8A",
    textAlign: "center",
  },
  artist: {
    fontSize: 16,
    color: "#6B21A8",
    textAlign: "center",
    marginBottom: 20,
  },
  detailBox: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 16,
    padding: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E40AF",
    marginTop: 8,
  },
  value: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 4,
  },
  previewBox: {
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  previewText: {
    color: "#4C1D95",
    fontWeight: "600",
    fontSize: 14,
  },
});
