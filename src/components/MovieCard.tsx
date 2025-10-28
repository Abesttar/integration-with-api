import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function MovieCard({ film, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: film.cover_url }} style={styles.image} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.title}>{film.title}</Text>
        <Text style={styles.subtitle}>Release: {film.release_date}</Text>
        <Text numberOfLines={2} style={styles.overview}>
          {film.overview || "No synopsis available."}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#f1f1f1', margin: 8, borderRadius: 8, padding: 8 },
  image: { width: 80, height: 100, borderRadius: 8 },
  title: { fontWeight: 'bold', fontSize: 16 },
  subtitle: { color: '#777', fontSize: 13 },
  overview: { color: '#444', fontSize: 12 },
});
