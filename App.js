import * as React from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";

import { Appbar, Avatar } from "react-native-paper";

import { TouchableOpacity } from "react-native-gesture-handler";
import AppNavigator from "./navigation/AppNavigator" 


export default function App() {
  return (
    <AppNavigator></AppNavigator>
  );
}


const styles = StyleSheet.create({
  appbarr: {
    marginTop: 30,
    backgroundColor: "#fff",
    elevation: 0
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
});
