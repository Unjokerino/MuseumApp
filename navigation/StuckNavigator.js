import React from 'react'
import { StyleSheet, View } from 'react-native'
import HomeScreen from "../screens/HomeScreen"
import DetailEventScreen from "../screens/DetailEventScreen"
import { createStackNavigator } from "@react-navigation/stack";
import { BottomNavigation, Text, Appbar } from "react-native-paper";
import EventScreen from "../screens/EventScreen"


const Stack = createStackNavigator();

export default function StuckNavigator(props) {

    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false
          }}
   
          name="Home"
          {...props}
          component={HomeScreen}
        />
        <Stack.Screen
            options={{
                headerShown: false
            }}

            name="DetailEventScreen"
            {...props}
            component={DetailEventScreen}
            />
          <Stack.Screen
            options={{
                headerShown: false
            }}

            name="EventScreen"
            {...props}
            component={EventScreen}
          />
      </Stack.Navigator>
           
      
    );
  }

const styles = StyleSheet.create({})
