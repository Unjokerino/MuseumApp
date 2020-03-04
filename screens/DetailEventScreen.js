import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,Image,Dimensions } from 'react-native'
import { Appbar,Title,Caption } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import moment from "moment";


const SCREEN_HEIGHT = Dimensions.get('window').height
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;


export default function DetailEventScreen(props) {
    const eventData = props.route.params.event
    const ruTitles = {
    
        phone:'Телефон',
        price:'Цена',
        date:'Дата',
        video:'Видео',
        vozvrast: "Возраст",
    
        inform: "Информация",
        mesto_sobitiya:"Место события",
        autor: "Автор",
        time: "Год",
        material: "Материалы",
        razmeri: "Рразмеры",
        number: "Номер",
        legend: "История",
        fond: "Фонд",
        description: "Описание",
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


    const [attrs,setAttrs] = useState({})

    useEffect(() => {
        renderItem(eventData)
    }, [])


    renderNavBar = () => (
        <View style={styles.navContainer}>
          <View style={styles.statusBar} />
          <View style={styles.navBar}>
            <Appbar.Action color="#fff" onPress={()=>{props.navigation.goBack()}} icon="arrow-left"></Appbar.Action>
            <Appbar.Content title={eventData.name}></Appbar.Content>
          </View>
        </View>
      )

    function renderContent() {
 
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                
                {eventData.price && <TouchableOpacity style={styles.buyButton}><Text style={{color:'#fff',fontSize:16}}>Buy</Text></TouchableOpacity>}
 
                <ScrollView>
             
                    <View style={{paddingHorizontal:10,marginVertical:10}} >
    
                        
                        {eventData.seanses !== undefined && eventData.seanses !== null ?
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            {eventData.seanses.map(seans =>{
                                return <TouchableOpacity style={{borderWidth:1,borderRadius:5,borderColor:'#f1f1f1',paddingHorizontal:6,paddingVertical:12,marginRight:5}}><Text >{seans.date}</Text></TouchableOpacity>
                            })}
                        </ScrollView> : <View></View>}
                    {
                        Object.entries(attrs).map(attr =>{
                            const [key,value] = attr
                            if(value !== null && value !== "")
                                return(
                                    <View key={key}>
                                        <Caption>{key}</Caption>
                                        <Title style={styles.title}>{value}</Title>
                                    </View>
                                )
                        })
                    
                    }
                    {console.log(Array.isArray(eventData.gallery))}
                    {Array.isArray(eventData.gallery) ? 
                    <View>
                        <Title style={styles.title}>Фотогаллерея</Title>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        
                            {eventData.gallery.map(item =>{
                                return(
                                    <TouchableOpacity>
                                <Image style={{width:150,height:200,marginRight:10,borderRadius:10}}     
                                source={{
                                uri: item}} />
                                </TouchableOpacity>
                                )
                            })}
                        </ScrollView></View> : <View></View>
    
                        }
                    
                    </View>
                </ScrollView>
                </View>
        )
    }

    async function renderItem(items){
        let current_attrs = []
 
        Object.entries(items).map(item =>{
            const [key,data] = item
           
        
            if(typeof key === 'number' || typeof key === 'string'){
           
                if(ruTitles[key] !== undefined){
                    current_attrs[ruTitles[key]] = data
                    setAttrs({...attrs,...current_attrs})
                  
                }
            }else if(typeof key === "object"){
                renderItem(key)
            }
        })
        return current_attrs
    }
    const img = {uri: eventData.img ? eventData.img !== "" ? eventData.img : "https://picsum.photos/700/700" : eventData.baner ?  eventData.baner.url : "https://picsum.photos/700/700"}
    return (
        <View style={styles.container}>
            <View style={{display:Platform.OS === 'ios' ? 'none' : 'flex', height:30,backgroundColor:'#fe7660'}}></View>
            <ReactNativeParallaxHeader
            headerMinHeight={HEADER_HEIGHT}
            headerMaxHeight={250}
            alwaysShowTitle={false}
            
            extraScrollHeight={20}
            navbarColor={'#fe7660'}
            title={
            <View style={{backgroundColor:'#0000004d',flex:1,height:'100%',width:'100%',alignItems:'flex-end',paddingVertical:25,paddingHorizontal:15,flexDirection:'row'}}>
              <View style={{flexDirection:"row"}}>
                <View style={styles.circle}></View>
                <Text style={styles.eventTitle}>{typeof eventData.type_afisha === "object"  ?  eventData.type_afisha.name :  afisha_type[eventData.type_afisha] !== undefined ? afisha_type[eventData.type_afisha] : eventData.type_afisha}</Text>
                </View>
            </View>}
            renderNavBar={renderNavBar}
            backgroundImage={img}
            backgroundImageScale={1.2}
            renderContent={renderContent}
            containerStyle={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            innerContainerStyle={{ flex: 1 }}

            />
        </View>
        );
}




const styles = StyleSheet.create({
    container:{
        flex:1
    },
    title:{
        fontSize:14,
    },
    buyButton:{
        alignSelf:'center',
        marginTop:10,
        width:200,
        paddingVertical:10,
        borderRadius:8,
        alignItems:'center',
        textAlign:'center',
        backgroundColor:'#55b9f3',
        shadowColor: "#55b9f3",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

elevation: 5,
    },  
    circle:{
        marginRight:10,
        alignSelf:'center',
        width:30,
        height:30,
        backgroundColor:'#2D9CDB',
        borderColor:'#fff',
        borderRadius:15,
        borderWidth:3
    },  
    eventTitle:{
        alignSelf:'center',
        color:'#fff',
        fontWeight:"200"
    },  
    navContainer: {
        height: HEADER_HEIGHT,
        marginHorizontal: 10,
      },
      statusBar: {
        height: STATUS_BAR_HEIGHT,
      },
      navBar: {
        height: NAV_BAR_HEIGHT,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      },
      titleStyle: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 18,
      },
})
