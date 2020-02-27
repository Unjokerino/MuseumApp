import * as React from "react";
import { View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import HomeScreen from "../screens/HomeScreen"
import StuckNavigator from "./StuckNavigator"

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function CustomDrawerContent(props) {

  return (
    <DrawerContentScrollView style={{ flex: 1 }} {...props}>
    </DrawerContentScrollView>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerPosition="right"
        drawerContentOptions={{
          activeTintColor: "#000",
          inactiveTintColor: "#000"
        }}
        drawerStyle={{
          backgroundColor: "#fff",
          color: "#000",
          activeTintColor: "#f1f1f1"
        }}
      >
        <Drawer.Screen initialParams={{screen:0}} name="Афиша событий" icon="menu" component={StuckNavigator} />
        <Drawer.Screen initialParams={{screen:0}} name="Выставки" icon="menu" component={HomeScreen} />

        <Drawer.Screen initialParams={{screen:0}} name="Коллекции" icon="menu" component={HomeScreen} />

        <Drawer.Screen initialParams={{screen:0}} name="Услуги" icon="menu" component={HomeScreen} />

        <Drawer.Screen initialParams={{screen:0}} name="Новости" icon="menu" component={HomeScreen} />

  
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
