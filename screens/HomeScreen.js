import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import moment from "moment";
import EventCard from "../components/EventCard";
import { Appbar, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen(props) {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [categoryIndex,setCategoryIndex] = useState(0)
  const [wait, setwait] = useState(false)
  const [fadeAnim,setFadeAnim] = useState(new Animated.Value(0))
  const [images, setImages] = useState([
    "https://www.museum-noyabrsk.ru/uploads/banner/art-mart_banner.jpg",
    "https://www.museum-noyabrsk.ru/uploads/banner/multiproekt-pobedavmestenoyabrsk_2020_banner.jpg",
    "https://www.museum-noyabrsk.ru/uploads/banner/yamal-kraj-zemli.-nachalo-zhizni_banner.jpg",
    "https://www.museum-noyabrsk.ru/uploads/banner/tajny-morya.jpg" // Network image
    // Local image
  ]);

  const [categories, setcategories] = useState([
    {
      title:'Афиша',
      url:"http://museum.binarywd.com/platforms/themes/blankslate/afisha.json",
      items: []
    },
    {
      title:'Выставки',
      url:"http://museum.binarywd.com/platforms/themes/blankslate/exhibitions.json",
      items: []
    },
    {
      title:'Коллекции',
      url:"http://museum.binarywd.com/platforms/themes/blankslate/collections.json",
      items: []
    },
    {
      title:'Услуги',
      url:"http://museum.binarywd.com/platforms/themes/blankslate/uslugi.json",
      items: []
    },
    {
      title:'Магазин',
      url:"http://museum.binarywd.com/platforms/themes/blankslate/shop.json",
      items: []
    },
    {
      title:'Новости',
      url:"http://museum.binarywd.com/platforms/themes/blankslate/news.json",
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
    
  }, []);

  function getData() {
    fetchData(categoryIndex)
    
  }

  async function fetchData(cat_index) {

    
    setRefreshing(true);
    fetch(categories[cat_index].url,{  headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      Pragma: "no-cache"
    }}).then(res =>
      res.json().then(response => {
        setRefreshing(false);
        setEvents(response)
        setFadeAnim(new Animated.Value(0))
      })
    )
 
  }

  useEffect(() => {
    getData()
  }, [categoryIndex])

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
          colors={['#fe7660', '#de2d73']}
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
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ justifyContent: "center" }}
            horizontal={true}
            style={{ height: 50 }}
          >
            {categories.map((category,index) =>{
              return(
                <TouchableOpacity onPress={() =>{
                  setCategoryIndex(index)
                }} style={[styles.category,{backgroundColor: categoryIndex === index ? '#fe7660' : '#fff'}]}>             
                <Text style={[styles.categoryText,{color:categoryIndex === index ? '#fff' : '#000'}]}> {category.title} </Text>
              </TouchableOpacity>
              )
            })}

          </ScrollView>
        </View>
    
        {Array.isArray(events) && events !== undefined ? events.map((event,index) => {
          if(index < 3){
            return <EventCard key={event.title} event={event} {...props} />;
          }
        }):<View></View>}
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
                // Bind opacity to animated value
      }}
    >
      <Button color="#fe7660" onPress={() =>{props.navigation.navigate('EventScreen',{...categories[categoryIndex]})}}>Перейти в раздел</Button>
    </Animated.View>
       
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5"
  },
  category: {
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    paddingHorizontal: 16,
    elevation: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    fontSize: 12
  },
  categoryText: {
    fontSize: 11
  }
});
