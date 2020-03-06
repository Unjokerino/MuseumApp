import React,{useEffect,useState} from 'react'
import { View, StyleSheet, Dimensions,ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from 'expo-font';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppNavigator from "./navigation/AppNavigator" 
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';


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
    
  }, [])


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
