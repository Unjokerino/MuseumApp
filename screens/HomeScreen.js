import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,ScrollView, TouchableOpacity,Image,RefreshControl } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import EventCard from "../components/EventCard"
import { Appbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen(props) {

  const [events,setEvents] = useState([])
  const [refreshing,setRefreshing] = useState(false)
  const [images,setImages] = useState([
        "https://www.museum-noyabrsk.ru/uploads/banner/art-mart_banner.jpg",
        "https://www.museum-noyabrsk.ru/uploads/banner/multiproekt-pobedavmestenoyabrsk_2020_banner.jpg",
        "https://www.museum-noyabrsk.ru/uploads/banner/yamal-kraj-zemli.-nachalo-zhizni_banner.jpg",
        "https://www.museum-noyabrsk.ru/uploads/banner/tajny-morya.jpg", // Network image
           // Local image
      ])

    useEffect(() => {
  
     
    }, [])

    function getData(){
      setRefreshing(true)
      fetch("http://wsolver.ru/fortApp/museumEvents.json").then(res => res.json().then(response =>{
        setRefreshing(false)
        setEvents(response)
      }))
    }

  return (
    <View style={{flex:1}}>
 
 <LinearGradient
                colors={['#fe7660', '#de2d73']}
                style={{
                    paddingTop: 30,
                    height: 80,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
                start={[0, 0]}
                end={[3, 0]}
            >
              <Appbar.Content title="Музейный Ресурсный Центр"></Appbar.Content>
                <Appbar.Action
                    color="#fff"
                    icon="menu"
                    onPress={() => props.navigation.openDrawer()}
                />
                
            </LinearGradient>
    <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getData} />
          } style={styles.container}>
                
      <View style={{height:180,zIndex:1 ,position:'relative'}}>
        <SliderBox
          style={{height:180,zIndex: 4,position:'relative'}}
          images={images}
          onCurrentImagePressed={index => console.log(`image ${index} pressed`)}
          currentImageEmitter={index => console.log(`current pos is: ${index}`)}
        />
      </View>
      <View style={{height:50,justifyContent:'center',marginVertical:10}}>
          <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{justifyContent:'center'}} horizontal={true} style={{height:50}}>
             <TouchableOpacity style={styles.category}><Text style={styles.categoryText}>Афиша</Text></TouchableOpacity>
             <TouchableOpacity style={styles.category}><Text style={styles.categoryText}>Выставки</Text></TouchableOpacity>
             <TouchableOpacity style={styles.category}><Text style={styles.categoryText}>Коллекции</Text></TouchableOpacity>
             <TouchableOpacity style={styles.category}><Text style={styles.categoryText}>Услуги</Text></TouchableOpacity>
             <TouchableOpacity style={styles.category}><Text style={styles.categoryText}>Новости</Text></TouchableOpacity>
        
          </ScrollView>
      </View>
      {events.map(event =>{
        return <EventCard key={event.title} event={event} {...props}/>
      })}


    </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#E5E5E5',
 
  
  },
  category:{
    width:100,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    marginHorizontal:5,
    paddingHorizontal:16,
   elevation:1,
    backgroundColor:'#fff', 
    borderRadius:12,
    fontSize:12
  },
  categoryText:{
    fontSize:13
  }
});
