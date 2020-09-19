import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview';

const BuyTicketScreen = (props) => {

    const token = props.route.params.token
    const event = props.route.params.event
    console.log(`https://ticketscloud.com/v1/widgets/common/meta?meta_event=${event}&token=${token}&m=w&lang=ru&utm=5e5f8c208b7305ea2ef41ab8`)
    return (

        <WebView source={{ uri: `https://ticketscloud.com/v1/widgets/common/meta?meta_event=${event}&token=${token}&m=w&lang=ru&utm=5e5f8c208b7305ea2ef41ab8` }} style={{ flex: 1, height: '100%', width: '100%' }} />

    )
}

export default BuyTicketScreen

