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
        description: "Описание",
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
    }
    const [attrs,setAttrs] = useState({})

    useEffect(() => {
        renderItem(eventData)
    }, [])


    renderNavBar = () => (
        <View style={styles.navContainer}>
          <View style={styles.statusBar} />
          <View style={styles.navBar}>
            <Appbar.Action color="#fff" onPress={()=>{props.navigation.goBack()}} icon="arrow-left"></Appbar.Action>
          </View>
        </View>
      )

    function renderContent() {
 
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
             
 
                <ScrollView>
             
                    <View style={{paddingHorizontal:10}} >
    
                        <Title>{eventData.name}</Title>
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
                   
                    {Array.isArray(styles.gallery) ? 
                    <View>
                        <Title style={styles.title}>Фотогаллерея</Title>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        
                            {eventData.gallery.map(item =>{
                                return(
                                <Image style={{width:150,height:200,marginRight:10,borderRadius:10}}     
                                source={{
                                uri: item}} ></Image>
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
    const img = {uri: eventData.img !== undefined ? eventData.img !== "" ? eventData.img : "https://picsum.photos/700/700" : eventData.baner !== undefined ?  eventData.baner : "https://picsum.photos/700/700"}
    return (
        <View style={styles.container}>
            <View style={{height:30,backgroundColor:'#fe7660'}}></View>
            <ReactNativeParallaxHeader
            headerMinHeight={HEADER_HEIGHT}
            headerMaxHeight={250}
            alwaysShowTitle={false}
            
            extraScrollHeight={20}
            navbarColor={'#fe7660'}
            title={eventData.name}
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
        fontSize:14,fontWeight:'bold',marginVertical:8
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
