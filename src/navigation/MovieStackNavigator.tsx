import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieListScreen from "../screens/MovieListScreen";
import MovieDetailScreen from "../screens/MovieDetailScreen";

export type MovieStackParamList = {
  MovieList: undefined;
  MovieDetail: { id: string; title: string };
};

const Stack = createNativeStackNavigator<MovieStackParamList>();

export default function MovieStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MovieList" component={MovieListScreen} options={{ title: "Movies" }} />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
}
