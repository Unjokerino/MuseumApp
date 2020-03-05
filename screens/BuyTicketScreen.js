import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview';

const BuyTicketScreen = (props) => {
    
    const token = props.route.params.token
    const event = props.route.params.event
    return (
       
            <WebView source={{ uri: `https://v2.ticketscloud.org/v1/widgets/common/meta?meta_event=${event}&token=${token}&m=w&lang=ru&utm=5e5f8c208b7305ea2ef41ab8` }} style={{flex:1,height:'100%',width:'100%'}} />
     
    )
}

export default BuyTicketScreen

const styles = StyleSheet.create({})
