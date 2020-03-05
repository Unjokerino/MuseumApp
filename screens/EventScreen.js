import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Icon
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import moment from "moment";
import EventCard from "../components/EventCard";
import { Appbar, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from '@react-native-community/datetimepicker';
import Fuse from 'fuse.js'

export default function EventScreen(props) {
  
    const [events, setEvents] = useState([]);
    const [categories, setcategories] = useState([])
    const [showDateBadge, setShowDateBadge] = useState(false)
    const [searchResult,setSearchResult] = useState([])
    const [dates, setdates] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [fadeAnim,setFadeAnim] = useState(new Animated.Value(0))
    const [categoryIndex, setcategoryIndex] = useState(-1)
    const [date, setDate] = useState(new Date(moment(new Date()).add(-1,'days')));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    

    const searchSeanses = (date) =>{
        setShow(false)
        let available_seanses = []
        events.forEach(event =>{
            event.seanses.forEach(seans =>{
                console.log(moment(seans.date).format("DD/MM") , moment(date).format("DD/MM"))
                if(moment(seans.date).format("DD/MM") === moment(date).format("DD/MM")  ){
                    available_seanses.push(event)
                }
            })
        })
        setSearchResult(available_seanses)
    }



    const searchDate = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(false);
      setDate(currentDate);
      searchSeanses(currentDate)
      setShowDateBadge(true)
      setShow(Platform.OS === 'ios' ? true : false);
    };
    
    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }

    const searchCategory = (category) => {
        var options = {
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
              "type_afisha.name"
            ]
          };
          var fuse = new Fuse(events, options); // "list" is the item array
          var result = fuse.search(category);
          setSearchResult(result)
    }
  
    const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };

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
        getDates()

    }, []);

    function getDates(){
        let dates = []
        let today = new Date()
        dates.push(moment(today))
        for(let i = 1;i<8;i++){
            dates.push(moment(today).add(i,'days'))
        }
        setdates(dates)
    }

    useEffect(() => {
        categoryIndex >= 0 ? searchCategory(categories[categoryIndex]) : setSearchResult(events)
    }, [categoryIndex])

    function getData() {
        setcategoryIndex(-1)
        fetchData(props.route.params.url)
    }
    async function fetchData(url) {


    setRefreshing(true);
    fetch(url,{  headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        Pragma: "no-cache"
    }}).then(res =>
        res.json().then(response => {
        setRefreshing(false);
        setEvents(response)
        setSearchResult(response)
        let types = []
        
        response.forEach(element => {
            console.log(element.type_afisha)
            element.type_afisha && types.push(element.type_afisha.name)
        });
        setFadeAnim(new Animated.Value(0))
        
        setcategories(types.filter( onlyUnique))
        })
    )
    }
    return(
        <View style={{ flex: 1 }}>
        <LinearGradient
            colors={['#1E87F0', '#de2d73']}
            style={{
                paddingTop: 30,
                height: 80,
         
            flexDirection: "row",
            alignItems: "center"
          }}
          start={[0, 0]}
          end={[3, 0]}
        >
            <Appbar.Action
            color="#fff"
            icon="arrow-left"
            onPress={() => props.navigation.goBack()}
          />
          <Appbar.Content title={props.route.params.title}> </Appbar.Content>
         
          {events.length > 0 && events[0].seanses && <Appbar.Action
            color="#fff"
            icon="calendar" 
            onPress={showDatepicker}
          />}
        </LinearGradient>
        
        <TouchableOpacity  onPress={()=>{setShowDateBadge(false);setSearchResult(events)}} style={{display:showDateBadge ? "flex" : "none"}}>
            <Text style={styles.badge}>
                {moment(date).format("DD/MM")}
            </Text>
        </TouchableOpacity>
   
        

  
            {show ? (
                <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={searchDate}
                />
            ) : <View/>}
      
      <View style={{height:60, display: categories.length > 1 ? 'flex' : 'none'}}>
          <ScrollView  
          
            showsHorizontalScrollIndicator={false} horizontal={true} style={[styles.categories]}>
              
              {categories.map((category,index) =>{

                return(
                    <TouchableOpacity key={index} onPress={()=>{index === categoryIndex ? setcategoryIndex(-1) : setcategoryIndex(index) }}>
                        <Text style={[styles.category,categoryIndex === index && {color:'#000',borderBottomColor:'#000'}]}>{category}</Text>
                    </TouchableOpacity>
                )
              })}
          </ScrollView>
          </View>
        <ScrollView   refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={getData} />
                } style={{marginTop:10}}>
            {searchResult.length === 0 ? <Text style={{width:'100%',textAlign:'center',color:'#000'}}>Ничего не найдено :(</Text> : <View></View>}
            {Array.isArray(searchResult) && searchResult !== undefined ? searchResult.map((event,index) => {
          
                return <EventCard key={event.title} event={event} {...props} />;
          
            }):<View></View>}
        </ScrollView>
        
        

        </View>
    )
}


const styles = StyleSheet.create({
    categories:{
        marginTop:20,

        flexDirection:'row',
        
        paddingHorizontal:10,
    },  
    badge:{marginTop:10,padding:8,marginLeft:10,backgroundColor:'#fd6b53',color:'#fff',borderRadius:6,borderWidth:1,borderColor:'#1E87F0',width:75,alignItems:'center',textAlign:'center'},
    category:{
      
        fontSize:13,
        marginRight:10,
        paddingBottom:8,
        color:'#1E87F0',
        borderBottomWidth:4,
        borderBottomColor:'#1E87F0'
    }
})
