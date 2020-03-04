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
    <TouchableOpacity onPress={() =>{
      props.navigation.navigate("DetailEventScreen",{event:props.event})
    }} style={styles.container}>
        <View>
           
            <Image
                style={{   borderTopLeftRadius:10,borderBottomLeftRadius:10, width: 150, height: 150 }}
                source={{
                    uri: eventData.img ? eventData.img !== "" ? eventData.img : "https://picsum.photos/300/300" : "https://picsum.photos/200/300",
                }}

            />
            
            {eventData.seanses != undefined ? <Text style={styles.badge}>до {moment(eventData.seanses[eventData.seanses.length -1].date).format("DD.MM")}</Text> : eventData.price != undefined ? <Text style={[styles.badge, eventData.price.length > 10 ? {top:100,bottom:0,borderBottomLeftRadius:5} : '']}>{eventData.price}</Text> :  false}
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.tag}>{typeof eventData.type_afisha === "object"  ?  eventData.type_afisha.name :  afisha_type[eventData.type_afisha] !== undefined ? afisha_type[eventData.type_afisha] : eventData.type_afisha}</Text>
            <Text style={styles.title}>{eventData.name}</Text>
            <Caption>{eventData.seanses != undefined && eventData.seanses.length > 0 ? eventData.seanses[0].date.split(' ')[0] : eventData.date}</Caption>
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
    fontWeight:"700",
    maxWidth:175,
  },
  badge:{
    backgroundColor:'#1E87F0',
    color:'#fff',
    position:'absolute',
    top: 10,
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
    paddingLeft:10,
    alignSelf:'center'
  },
});
