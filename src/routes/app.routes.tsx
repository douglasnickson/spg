import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Dashboard from '../pages/Dashboard';

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const PlaylistStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#272727',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen name="Home" component={Dashboard} />
  </HomeStack.Navigator>
);

const PlaylistStackScreen = () => (
  <PlaylistStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#272727',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <PlaylistStack.Screen name="Playlist" component={Dashboard} />
  </PlaylistStack.Navigator>
);

const SettingsStackScreen = () => (
  <SettingsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#272727',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <SettingsStack.Screen name="Settings" component={Dashboard} />
  </SettingsStack.Navigator>
);

const AppRoutes: React.FC = () => (
  <NavigationContainer independent>
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'PlaylistTab') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'SettingsTab') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1ed760',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          height: 50,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: '#272727',
          position: 'absolute',
          borderTopWidth: 0,
        },
      })}>
      <Tabs.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{ headerShown: false, tabBarLabel: 'Home' }}
      />
      <Tabs.Screen
        name="PlaylistTab"
        component={PlaylistStackScreen}
        options={{ headerShown: false, tabBarLabel: 'Playlists' }}
      />
      <Tabs.Screen
        name="SettingsTab"
        component={SettingsStackScreen}
        options={{ headerShown: false, tabBarLabel: 'Configurações' }}
      />
    </Tabs.Navigator>
  </NavigationContainer>
);

export default AppRoutes;
