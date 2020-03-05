import React,{useEffect,useState} from 'react'
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from 'expo-font';
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
  useEffect(() => {
    Font.loadAsync({
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),

    });
  }, [])
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
