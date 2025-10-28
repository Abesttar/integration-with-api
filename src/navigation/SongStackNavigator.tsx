import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SongListScreen from "../screens/SongListScreen";
import SongDetailScreen from "../screens/SongDetailScreen";

export type SongStackParamList = {
  SongList: undefined;
  SongDetail: { id: string; title: string };
};

const Stack = createNativeStackNavigator<SongStackParamList>();

export default function SongStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SongList" component={SongListScreen} options={{ title: "Songs" }} />
      <Stack.Screen
        name="SongDetail"
        component={SongDetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
}
