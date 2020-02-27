import React,{useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import {Title,Caption,Appbar, Headline} from "react-native-paper";
import FastImage from 'react-native-fast-image'

export default function EventCard(props) {
  
  return (
 
    <TouchableOpacity onPress={() =>{
      props.navigation.navigate("DetailEventScreen",{event:props.event})
    }} style={styles.container}>
        <View>
           
            <Image
                style={{   borderTopLeftRadius:10,borderBottomLeftRadius:10, width: 150, height: 150 }}
                source={{
                    uri: `https://museum-noyabrsk.ru${props.event.image}`,
                    
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            <Text style={styles.badge}>до 28 марта</Text>
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.tag}>{props.event.type}</Text>
              <Text style={styles.title}>{props.event.title}</Text>
            <Caption>{props.event.date}</Caption>
        </View>
        
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:10,
    height:150,
    borderRadius:10,
    marginBottom:10,
    flexDirection:'row',
    backgroundColor: '#fff',
    elevation:2,
  },
  tag:{
    color:'#1E87F0',
    fontWeight:"700"
  },
  badge:{
    backgroundColor:'#1E87F0',
    color:'#fff',
    position:'absolute',
    top: 10,
    right:0,
    padding:4,
    fontWeight:"700"
    
  },
  title:{
    width:170,
    fontWeight:"700"
  },
  infoContainer:{
   
    justifyContent:'center',
    paddingLeft:10,
    alignSelf:'center'
  },
});
