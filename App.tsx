import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MovieListScreen from './src/screens/MovieListScreen';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import SongListScreen from './src/screens/SongListScreen';
import SongDetailScreen from './src/screens/SongDetailScreen';

export type RootStackParamList = {
  Tabs: undefined;
  MovieDetail: { id: string; title?: string };
  SongDetail: { id: string; title?: string };
};

export type TabParamList = {
  Movies: undefined;
  Songs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';

          if (route.name === 'Movies') {
            iconName = focused ? 'film' : 'film-outline';
          } else if (route.name === 'Songs') {
            iconName = focused ? 'musical-notes' : 'musical-notes-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Movies" component={MovieListScreen} />
      <Tab.Screen name="Songs" component={SongListScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          options={({ route }) => ({ title: route.params?.title || 'Movie Detail' })}
        />
        <Stack.Screen
          name="SongDetail"
          component={SongDetailScreen}
          options={({ route }) => ({ title: route.params?.title || 'Song Detail' })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
