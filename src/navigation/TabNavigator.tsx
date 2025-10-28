import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MovieStackNavigator from "./MovieStackNavigator";
import SongScreen from "../screens/SongListScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName = route.name === "Movies" ? "film-outline" : "musical-notes-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Movies" component={MovieStackNavigator} />
        <Tab.Screen name="Songs" component={SongScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
