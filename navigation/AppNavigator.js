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
import EventScreen from "../screens/EventScreen"
import StuckNavigator from "./StuckNavigator"

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const categories =[
  {
    title:'Афиша',
    url:"https://museum-noyabrsk.ru/platforms/themes/blankslate/afisha.json",
    items: []
  },
  {
    title:'Выставки',
    url:"https://museum-noyabrsk.ru/platforms/themes/blankslate/exhibitions.json",
    items: []
  },
  {
    title:'Коллекции',
    url:"https://museum-noyabrsk.ru/platforms/themes/blankslate/collections.json",
    items: []
  },
  {
    title:'Услуги',
    url:"https://museum-noyabrsk.ru/platforms/themes/blankslate/uslugi.json",
    items: []
  },
  {
    title:'Сувениры',
    url:"https://museum-noyabrsk.ru/platforms/themes/blankslate/shop.json",
    items: []
  },
  {
    title:'Новости',
    url:"https://museum-noyabrsk.ru/platforms/themes/blankslate/news.json",
    items: []
  },
]

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView  {...props}>
            <Image source={require("../assets/images/logoRound.png")} style={{alignSelf:'center',marginTop:10,width:100,height:100,marginBottom:10}}/>

      <DrawerItemList {...props} />
      {categories.map(category =>{
        return(
          <DrawerItem
          inactiveBackgroundColor="#0c3961"
          inactiveTintColor="#fff"
          activeTintColor="#fff"
          style={{color:'#fff'}}
          label={category.title}
          onPress={() => props.navigation.navigate('EventScreen',{
          url:category.url,
          title:category.title
          })}
        />
        )
      })}
    </DrawerContentScrollView>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
      
      
      backgroundColor="#000"
      drawerContent={props => CustomDrawerContent(props)}
        drawerPosition="right"
        drawerContentOptions={{
          activeTintColor: "#fff",
          inactiveTintColor: "#fff"
        }}
        drawerStyle={{
          backgroundColor: "#0d4372",
          color: "#000",
          activeTintColor: "#fff"
        }}
      >
        <Drawer.Screen
          initialParams={{screen:0}} name="Главная" icon="menu" component={StuckNavigator} />


  
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
