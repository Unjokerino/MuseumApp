import React,{useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import {Title,Caption,Appbar, Headline} from "react-native-paper";
import moment from "moment";
import localization from 'moment/locale/ru'


export default function EventCard(props) {

  function unicodeToChar(text) {
    return text.replace(/\\u[\dA-Fa-f]{4}/g, 
        function (match) {
          let result = String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
          console.log(result)
            return result
        });
}

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
          }} style={[styles.container]}>
          <View >
          <Image
          style={[styles.image]}
          source={{
          uri: eventData.baner ? eventData.baner.url : eventData.img ? eventData.img !== "" ? eventData.img : "https://picsum.photos/300/300" : "https://picsum.photos/200/300",
          }}
          
          />
          {eventData.seanses != undefined ? <Text style={styles.badge}>до {moment(eventData.seanses[eventData.seanses.length -1].date).locale("ru", localization).format("D MMMM")}</Text> : eventData.price != undefined ? <Text style={[eventData.price.length > 10 ? styles.topBadge : styles.badge]}>{eventData.price}</Text> :  false}
          </View>
          <View style={[styles.infoContainer]}>
    <Text style={styles.tag}>{eventData.type_afisha  ?  eventData.type_afisha.name :  afisha_type[eventData.type_afisha] !== undefined ? afisha_type[eventData.type_afisha] : eventData.type_afisha}</Text>
    <Text style={styles.title}>{unicodeToChar(eventData.name)}</Text>
    <Text style={styles.caption}>{eventData.seanses != undefined && eventData.seanses.length > 0 ? moment(eventData.seanses[0].date).format('D MMMM Y') : moment(eventData.date).format("D MMMM Y")}</Text>
    </View>
    
    
    
    </TouchableOpacity>
    </View>
    

  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:10,
    backgroundColor:'#fff',
    borderRadius:6,
    elevation:3,
    marginBottom:16,
    flexDirection:'row',
    
    
  },
  caption:{
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 11,
    lineHeight: 13,
    textTransform: 'uppercase',
    color: '#999999'
  },
  divider:{
    borderBottomColor:'#e0e0e0',
    borderBottomWidth:1,
    height:1,
    marginHorizontal:10,
    marginVertical:15,
  },
  image:{
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    height:150, 
    width:150
  },
  tag:{
    lineHeight:13,
    fontFamily:'Roboto-Regular',
    textTransform:'uppercase',
    color:'#1E87F0',
    fontSize:11,
    fontWeight:"bold",
    maxWidth:175,
  },
  badge:{
    textTransform:'uppercase',
    backgroundColor:'#1E87F0',
    color:'#fff',
    position:'absolute',
    minWidth:75,
    justifyContent:'center',
    textAlign:'center',
    right:0,
    top:15,
    padding:4,
    fontWeight:"700"
    
  },
  topBadge:{
    textTransform:'uppercase',
    backgroundColor:'#1E87F0',
    color:'#fff',
    position:'absolute',
    minWidth:75,
    justifyContent:'center',
    textAlign:'center',
    right:0,
    
    padding:4,
    fontWeight:"700",
    height:50,
    bottom:0,
    borderBottomLeftRadius:5
  },
  title:{
    fontFamily:'Roboto-Medium',
    width:170,
    fontSize:15,
    marginVertical:10,
    
  },
  infoContainer:{
    justifyContent:'center',
    paddingLeft:15,
    alignSelf:'center'
  },
});
