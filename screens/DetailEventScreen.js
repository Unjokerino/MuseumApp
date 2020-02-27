import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Appbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';



export default function DetailEventScreen(props) {
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
                <Appbar.Action
                    color="#fff"
                    icon="arrow-left"
                    onPress={() => props.navigation.goBack()}
                />
              <Appbar.Content title=""></Appbar.Content>
               
                
            </LinearGradient>
            <Text>{JSON.stringify(props.route.params.event)}</Text>
            </View>
    )
}

const styles = StyleSheet.create({})
