import React, { useEffect } from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  Ionicons,
} from '@expo/vector-icons';

import LibraryScreen from './src/screens/LibraryScreen.js';
import SearchScreen from './src/screens/SearchScreen';
import AddBookScreen from './src/screens/AddBookScreen';
import BookDetailsScreen from './src/screens/BookDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

import {
  initializeBooks,
} from './src/services/storage';

const Stack =
  createNativeStackNavigator();

const Tab =
  createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: '#A85858',
        tabBarInactiveTintColor: '#777',

        tabBarStyle: {
          height: 62,
          paddingBottom: 7,
          paddingTop: 4,
          backgroundColor: '#FFF9F8',
          borderTopColor: '#EADDDD',
        },

        tabBarLabelStyle: {
          fontSize: 8,
        },

        tabBarIcon: ({
          color,
          size,
        }) => {
          let icon = 'book-outline';

          if (route.name === 'Estante') {
            icon = 'library-outline';
          }

          if (route.name === 'Buscar') {
            icon = 'search-outline';
          }

          if (route.name === 'Adicionar') {
            icon = 'add-circle-outline';
          }

          if (route.name === 'Perfil') {
            icon = 'person-outline';
          }

          return (
            <Ionicons
              name={icon}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Estante"
        component={LibraryScreen}
      />

      <Tab.Screen
        name="Buscar"
        component={SearchScreen}
      />

      <Tab.Screen
        name="Adicionar"
        component={AddBookScreen}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    initializeBooks();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Main"
          component={Tabs}
        />

        <Stack.Screen
          name="BookDetails"
          component={BookDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
