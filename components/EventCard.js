import React,{useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import {Title,Caption,Appbar, Headline} from "react-native-paper";


import moment from "moment";

export default function EventCard(props) {
  const afisha_type = {
    "77":"Выставки",
    "78":"Конкурсы",
    "82":"Конференции",
    "79":"Мастер-классы",
    "83":"Мероприятия",
    "80":"Музейные Мероприятия",
    "81":"Праздники",
    "54":"Виртуальные выставки",
    "53":"Постоянные выставки",
    "55":"Фотоматериалы",
    "51":"Мир природы",
    "49":"Вещевая коллекция и этнография",
    "47":"Геология",
    "43":"Графика",
    "46":"Живопись",
    "45":"Мир детства",
    "48":"Скульптура",
    "44":"Увлечение и колеционирование ",
    "40":"Мастер-классы",
    "39":"Творческие мастерские",
    "41":"Тематические лекции",
    "27":"Броши",
    "28":"Визитницы",
    "29":"Деревяная матрешка",
    "30":"Игрушки из шерсти",
    "31":"Колокольчики",
    "32":"Кулоны",
    "33":"Магниты",
    "34":"Сувенирные монеты",
    "35":"Текстильные куклы",
    "36":"Упаковка подарков и сувениров "}
  const eventData = props.event
  return (
    <View>
      <TouchableOpacity onPress={() =>{
          props.navigation.navigate("DetailEventScreen",{event:props.event})
          }} style={[styles.container,eventData.baner && {flexDirection:'column',borderRadius:10}]}>
          <View >
          <Image
          resizeMode={eventData.baner ? "contain" : "cover"}
          style={[styles.image, eventData.baner && {width:'100%',height: 75,alignSelf: 'stretch'}]}
          source={{
          uri: eventData.baner ? eventData.baner.url : eventData.img ? eventData.img !== "" ? eventData.img : "https://picsum.photos/300/300" : "https://picsum.photos/200/300",
          }}
          
          />
          {eventData.seanses != undefined ? <Text style={styles.badge}>до {moment(eventData.seanses[eventData.seanses.length -1].date).format("DD.MM")}</Text> : eventData.price != undefined ? <Text style={[styles.badge, eventData.price.length > 10 ? {height:50,bottom:0,borderBottomLeftRadius:5} : '']}>{eventData.price}</Text> :  false}
          </View>
          <View style={[styles.infoContainer, eventData.baner && {
          
          width:'100%',
          borderTopColor:'#f1f1f1',
          borderTopWidth:1,
          bottom:0,}]}>
    <Text style={styles.tag}>{eventData.type_afisha  ?  eventData.type_afisha.name :  afisha_type[eventData.type_afisha] !== undefined ? afisha_type[eventData.type_afisha] : eventData.type_afisha}</Text>
    <Text style={styles.title}>{eventData.name}</Text>
    <Caption>{eventData.seanses != undefined && eventData.seanses.length > 0 ? eventData.seanses[0].date.split(' ')[0] : eventData.date}</Caption>
    </View>
    
    
    
    </TouchableOpacity>
    <View style={styles.divider}></View>
    </View>
    

  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:10,


    
    flexDirection:'row',
    
    
  },
  divider:{
    borderBottomColor:'#e0e0e0',
    borderBottomWidth:1,
    height:1,
    marginHorizontal:10,
    marginVertical:15,
  },
  image:{

    height:200, 
    width:150
  },
  tag:{
    color:'#1E87F0',
    fontWeight:"700",
    maxWidth:175,
  },
  badge:{
    backgroundColor:'#1e87f0d9',
    color:'#fff',
    position:'absolute',
    minWidth:75,
    justifyContent:'center',
    textAlign:'center',
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
    paddingLeft:15,
   
    alignSelf:'flex-start'
  },
});
