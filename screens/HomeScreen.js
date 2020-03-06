import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import moment from "moment";
import EventCard from "../components/EventCard";
import { Appbar, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import EventScreen from '../screens/EventScreen'
const deviceWidth = Dimensions.get("window").width;


export default function HomeScreen(props) {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [categoryIndex,setCategoryIndex] = useState(0)
  const [wait, setwait] = useState(false)
  const [currentOffset, setcurrentOffset] = useState(0)
  const [categoryOffset, setcategoryOffset] = useState(0)
  const [scrollState, setscrollState] = useState(false)
  const [categoryScrollState, setcategoryScrollState] = useState(false)
  const [fadeAnim,setFadeAnim] = useState(new Animated.Value(0))
  const [images, setImages] = useState([
    "https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-endless-river.png"
  ]);
  let oldDate = ''
  const banersUrl = 'https://museum-noyabrsk.ru/platforms/themes/blankslate/adv.json'
  const [categories, setcategories] = useState([
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
  ])

  const afisha_types = {
  "77":"Выставки",
  "78":"Конкурсы",
  "82":"Конференции",
  "79":"Мастер-классы",
  "83 ":"Мероприятия",
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




  useEffect(() => {
    getData()
  }, []);

  useEffect(() => {
    //getData()
    if (scrollState && categoryScrollState){
      scrollState.scrollTo({
        x: deviceWidth * categoryIndex,
        y: 0,
        animated: false
      });
      categoryScrollState.scrollTo({
        x: 100*categoryIndex  - (deviceWidth/2-90),
        y: 0,
        animated: true
      });
    }

      
  }, [categoryIndex])

  function getData() {
  
    fetch(banersUrl).then(response => response.json().then(json=>{
      let temp_images = []
      json.map(baner =>{
        temp_images.push(baner.img)
      })
      setImages(temp_images)
    }))

    for(let i = 0; i < categories.length ; i ++){
      fetchData(i)
    }
    
  }

  

  async function filterByDate(all_events) {
    let seansesByDate = []
    all_events.map(event =>{
      if(event.seanses){
        event.seanses.map(seans =>{
          seansesByDate.push({
            ...event,
            date:seans.date
          })
        })
      }
    })
    seansesByDate.sort((a, b) => (a.date > b.date) ? 1 : -1)
    return seansesByDate.length > 0 ? seansesByDate : all_events;
  }

  async function fetchData(cat_index) {
    setRefreshing(true);
    let result = await fetch(categories[cat_index].url,{  headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      Pragma: "no-cache"
    }}).then(res =>
      res.json().then(response => {
        setRefreshing(false);
        events[cat_index] = (response)
        setFadeAnim(new Animated.Value(0))
      })
    ).catch(e => {
      setRefreshing(false)
    })
  }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
          colors={['#1E87F0', '#1E87F0']}
          style={{
              paddingTop: 30,
              height: 80,
       
          flexDirection: "row",
          alignItems: "center"
        }}
        start={[0, 0]}
        end={[3, 0]}
      >
        <Appbar.Content title="Музейный Ресурсный Центр"> </Appbar.Content>
        <Appbar.Action
          color="#fff"
          icon="menu"
          onPress={() => props.navigation.openDrawer()}
        />
      </LinearGradient>
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            
          }
        }}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getData} />
        }
        style={styles.container}
      >
        <View style={{ height: 180, zIndex: 1, position: "relative" }}>
          <SliderBox
            style={{ height: 180, zIndex: 4, position: "relative" }}
            images={images}
            onCurrentImagePressed={index =>
              console.log(`image ${index} pressed`)
            }
            currentImageEmitter={index =>
              console.log(`current pos is: ${index}`)
            }
          />
        </View>
        <View
          style={{ height: 50, justifyContent: "center", marginVertical: 10 }}
        >
          <ScrollView
            ref = {setcategoryScrollState}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ justifyContent: "center" }}
            horizontal={true}
            style={{ height: 50 }}
          >
            {categories.map((category,index) =>{
              return(
                <TouchableOpacity key={index} onPress={() =>{
                  setCategoryIndex(index)
                }} style={[styles.category,{backgroundColor: categoryIndex === index ? '#1E87F0' : '#fff'}]}>             
                <Text style={[styles.categoryText,{color:categoryIndex === index ? '#fff' : '#000'}]}> {category.title} </Text>
              </TouchableOpacity>
              )
            })}

          </ScrollView>
        </View>
        <ScrollView onScroll={event => {
          let offset = Math.round(
            event.nativeEvent.contentOffset.x / deviceWidth
          )
          offset !== categoryIndex && setCategoryIndex(offset) 

        }} ref={setscrollState} showsHorizontalScrollIndicator={false} pagingEnabled={true}  horizontal={true}>
          
          {events.map((tab,index) =>{
            return(
              <ScrollView key={index} style={{}}>
                {Array.isArray(tab) && tab !== undefined ? tab.map((event,index) => {
                  oldDate = date ? date : ''
                  let date = event.date && moment(event.date).format('D MMMM')
                    if(index < 5){
                      return (
                        <View>
                          {event.date !== undefined ? events[index - 1] ? date !== moment(events[index - 1].date).format('D MMMM') && <Text style={styles.title}>{date}</Text> : <Text style={styles.title}>{date}</Text>: <View/>}
                          <EventCard key={event.title} event={event} {...props} />
                        </View>
                      );
                  }
                
                }):<View></View>}
              </ScrollView>
            )
          })}
        </ScrollView>
    </ScrollView>
    <View style={styles.detailCategory}>
      <Button style={{
                      backgroundColor:'#1E87F0',
                     }} color="#fff" onPress={() =>{props.navigation.navigate('EventScreen',{...categories[categoryIndex]})}}>Перейти в раздел</Button>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7"
  },
  title:{
    fontFamily:'Roboto-Medium',
    fontSize:16,
    padding:10,
  },
  detailCategory:{
   
    position:'absolute',
    zIndex:999,
    bottom:20,
    width:'100%',
    alignItems:'center'
  },
  category: {
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    paddingHorizontal: 16,
    borderColor:'#e0e0e0',
    elevation: 1,
    borderRadius: 6,
    fontSize: 12,
    backgroundColor:'#fff'
  },
  categoryText: {
    fontFamily:'Roboto-Medium',
    fontSize: 11
  }
});
