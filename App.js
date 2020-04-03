import React,{useEffect,useState} from 'react'
import { View, StyleSheet, Dimensions,ActivityIndicator, AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from 'expo-font';
import { AppLoading, Updates, Notifications  } from "expo";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppNavigator from "./navigation/AppNavigator" 
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: "AIzaSyDHtsweqDfruO6JhZBxaQvkG-NPaBqTcHs",
  authDomain: "kinoafisha-d29d7.firebaseapp.com",
  databaseURL: "https://kinoafisha-d29d7.firebaseio.com",
  projectId: "kinoafisha-d29d7",
  storageBucket: "kinoafisha-d29d7.appspot.com",
  messagingSenderId: "1080891018380",
  appId: "1:1080891018380:web:7224710c052df32b83ffa9",
  measurementId: "G-SNP0W2B5N6"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [visible, setvisible] = useState(false)
  useEffect(() => {
    Font.loadAsync({
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
    }).then(() => setLoaded(true))
    checkForUpdates()
    registerNotifications()
  }, [])


  async function registerNotifications(){
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    // only asks if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    // On Android, permissions are granted on app installation, so
    // `askAsync` will never prompt the user
  
    // Stop here if the user did not grant permissions
    if (status !== 'granted') {
      alert('No notification permissions!');
      return;
    }
  
    // Get the token that identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    storeHighScore(Constants.installationId,token)
  }

  function storeHighScore(userId, token) {
    firebase.database().ref('apps/museumApp/users/' + userId).set({
      token: token,
      appOwnership: Constants.appOwnership
    });
  }

  async function checkForUpdates() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        setvisible(true)
        //Updates.reloadFromCache();
      }
    } catch (e) {
      // handle or log error
    }
  }

  if(loaded){
    return (
      <Provider style={{ flex: 1 }}>
        <AppNavigator></AppNavigator>
        <Portal>
          <Modal visible={visible}>
            <View style={{paddingVertical:10,backgroundColor:'#fff',justifyContent:'center',alignContent:'center'}}>
              <Text style={{textAlign:'center',fontWeight:'bold'}}>Приложению необходимо обновиться</Text>
              <Button
              style={{ marginTop: 30 }}
              onPress={() => Updates.reloadFromCache()}>
                Обновить
              </Button>
            </View>
          </Modal>
        </Portal>
      </Provider>
    );
  }
  else{
    return (
      <ActivityIndicator></ActivityIndicator>
    );
  }
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
