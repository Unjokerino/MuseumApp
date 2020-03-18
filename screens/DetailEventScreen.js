import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,Image,Dimensions,Animated } from 'react-native'
import { Appbar,Title,Caption, Portal,Provider,Modal,Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import moment from "moment";
import { WebView } from 'react-native-webview';
import ImageView from 'react-native-image-view';

const SCREEN_HEIGHT = Dimensions.get('window').height
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;


export default function DetailEventScreen(props) {
    const eventData = props.route.params.event
    const [visible, setvisible] = useState(false)
    const [isImageViewVisible, setIsImageViewVisible] = useState(false)
    const [imageIndex, setimageIndex] = useState(0)
    const [webViewVisible, setWebViewVisible] = useState(false)
    const [images, setimages] = useState([])
    const _showModal = () => {
        if(eventData["data-tc-event"]){
            if(eventData["data-tc-token"]){
            props.navigation.navigate('Купить билет',{
                event:eventData["data-tc-event"],
                token: eventData["data-tc-token"],
            })
            }else{
                setvisible(true)
            }
            
        }
        

    }
    const _hideModal = () => {
        setvisible(false);
        setWebViewVisible(false)
    }

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


    const renderNavBar = () => (
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
            <View style={styles.container}>
                   
                
                <ScrollView>
                    <Title style={{paddingTop:14,fontSize:34,fontFamily:'Roboto-Medium'}}>{eventData.name}</Title>
                    <View style={{marginVertical:10}} >
                        {eventData.seanses !== undefined && eventData.seanses !== null ?
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            {eventData.seanses.map(seans =>{
                                return <TouchableOpacity onPress={_showModal} style={{borderWidth:1,borderRadius:5,borderColor:'#f1f1f1',paddingHorizontal:6,paddingVertical:12,marginRight:5}}><Text >{moment(seans.date).format('D MMMM HH:mm')}</Text></TouchableOpacity>
                            })}
                        </ScrollView> : <View></View>}
                    {
                        Object.entries(attrs).map(attr =>{
                            const [key,value] = attr
                            if(value !== null && value !== "")
                                return(
                                    <View key={key}>
                                        <Caption style={styles.caption}>{key}</Caption>
                                        <Title style={styles.title}>{value}</Title>
                                    </View>
                                )
                        })
                    
                    }
                    {Array.isArray(eventData.gallery) &&
                    <View>
                        <Caption style={[styles.caption,{marginBottom:10}]}>Фотогаллерея</Caption>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            
                            {eventData.gallery.map((item,index) =>{
                                images.push({source:{
                                    uri:item
                                }})
                                return(
                                <TouchableOpacity key={item}
                                onPress={() => {      
                                    setimageIndex(index)
                                    setIsImageViewVisible(true)
                                }}>
                                <Image style={styles.image}     
                                source={{
                                uri: item}} />
                                </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                        <ImageView
                            glideAlways
                            images={images}
                            imageIndex={imageIndex}
                            animationType="fade"
                            isVisible={isImageViewVisible}
                            onClose={() => setIsImageViewVisible(false)}
                            onImageChange={index => {
                                console.log(index);
                            }}
                        />
                        
                        </View>}
                    
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
    const img = {uri: eventData.img ? eventData.img !== "" ? eventData.img : "https://picsum.photos/700/700" : "https://picsum.photos/700/700"}
    return (
        <Provider style={styles.container}>

            <View style={{display:Platform.OS === 'ios' ? 'none' : 'flex', height:30,backgroundColor:'#1E87F0'}}></View>
                <ReactNativeParallaxHeader
                headerMinHeight={HEADER_HEIGHT}
                headerMaxHeight={250}
                alwaysShowTitle={false}
                
                extraScrollHeight={20}
                navbarColor={'#1E87F0'}
                title={
                    <View style={{backgroundColor:'#0000004d',flex:1,height:'100%',width:'100%',alignItems:'flex-end',paddingVertical:25,paddingHorizontal:15,flexDirection:'row'}}>
                        <View style={{flexDirection:"row"}}>
                        <View style={styles.circle}></View>
                            <Text style={styles.eventTitle}>{ eventData.type_afisha && eventData.type_afisha.name && eventData.type_afisha.name}</Text>
                        </View>
                    </View>
                }
                renderNavBar={renderNavBar}
                backgroundImage={img}
                backgroundImageScale={1.2}
                renderContent={renderContent}
                containerStyle={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                innerContainerStyle={{ flex: 1 }}

                />

            {eventData["data-tc-event"] ?
                <View style={[styles.buyButton,!eventData["data-tc-event"] && {backgroundColor:'#f1f1f1'}]}>
                    <TouchableOpacity  onPress={_showModal} style={[styles.buyButtonOpacity,!eventData["data-tc-event"] && {backgroundColor:'#f1f1f1'}]}>
                        <Text style={{color:'#fff',fontSize:16}}>Купить</Text>
                    </TouchableOpacity>
                </View>
             : <View/>}
          
            <Portal>
                <Modal visible={visible} onDismiss={_hideModal}>
                   
                    <View style={styles.modal}>
                        <Title>{eventData.name}</Title>
                        <Caption style={styles.caption}>Цена</Caption>
                        <Text>{eventData.price}</Text>

                        <Caption style={styles.caption}>Номер телефона</Caption>
                        <TextInput placeholder=""></TextInput>
                        <Caption style={styles.caption}>Email</Caption>
                        <TextInput placeholder=""></TextInput>
                        <Caption style={styles.caption}>Telegram</Caption>
                        <TextInput placeholder=""></TextInput>
                        <Button onPress={_hideModal} style={{marginVertical:10}}>Отправить</Button>
                    </View>
                </Modal>
                <Modal visible={webViewVisible} onDismiss={_hideModal}>
               </Modal>
               
            </Portal>
            

            
       
        </Provider>
        );
}




const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative',
        paddingHorizontal:24,
    },
    title:{
        fontFamily:'Roboto-Regular',
        fontSize:14,
        fontWeight:'200',
        letterSpacing:0.5,
        lineHeight:16,
    },
    modal:{
        flex:1,
        paddingVertical:10,
        paddingHorizontal:20,
        backgroundColor:'#fff'
    },
    buyButtonOpacity:{
        width:'100%',
        height:'100%'
    },
    caption:{
        marginTop:10,
        fontFamily:'Roboto-Regular',
        textTransform:'uppercase',

    },
    buyButton:{
        alignSelf:'center',
        position: 'absolute',
      
        bottom: 30,
        
        marginTop:10,
        width:200,
        paddingVertical:10,
        borderRadius:8,
        alignItems:'center',
        textAlign:'center',
        backgroundColor:'#1E87F0',
        shadowColor: "#1E87F0",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 7,
    },  
    image:{width:150,height:200,marginRight:10,borderRadius:10},
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
        fontFamily:'Roboto-Thin',
        fontSize:12,
        letterSpacing:0.5,
        lineHeight:16,
        textTransform:'uppercase',
        alignSelf:'center',
        color:'#fff',
        
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
      absoluteFill:{
          height:'100%',
          width:'100%',
          flex:1,
          position:'absolute'
      }
})
