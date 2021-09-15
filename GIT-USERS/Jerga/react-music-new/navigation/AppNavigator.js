import React from "react";
import { Platform } from "react-native";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";

import AlbumsScreen from "../screens/AlbumsScreen";
import AlbumDetailScreen from "../screens/AlbumDetailScreen";
import StorageScreen from "../screens/StorageScreen";
import FavoriteScreen from "../screens/FavoriteScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Albums" component={AlbumsScreen} />
      <Stack.Screen name="AlbumDetail" component={AlbumDetailScreen} />
      <Stack.Screen name="Favorite" component={FavoriteScreen} />
    </Stack.Navigator>
  );
};

const LinkStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Links" component={LinksScreen} />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Storage" component={StorageScreen} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Links" component={LinkStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
