import React, {Component} from 'react';
import {StyleSheet, Image, Text, Platform,Dimensions, View } from 'react-native';
import Picture from '../components/Picture';
import AutoHeightImage from 'react-native-auto-height-image';
import * as axios from 'axios';



export default class Picture2 extends React.Component {

    render() {
      var {height, width} = Dimensions.get('window');
      return (
        <>
            <View style={styles.container}>
                <View style={styles.top}/>
                    <View style={styles.body}>
                    <AutoHeightImage
                    width={width-42}
                    style={{flex:1,}}
                    source={{uri: 'https://pbs.twimg.com/media/DZdQjm-VwAAETXi.jpg'}}
                    />
                    </View>
                        <View style={styles.bottom}>
                            <Text style={styles.text}>
                                바다에서 한컷
                            </Text>
                        </View>
            </View>


            


        </>
      )
    }
}

const styles = StyleSheet.create ({
    container:{
        flex:1,
        margin:20,
        backgroundColor:'white',
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    
    },
    top:{
        height:40,
        backgroundColor:'white'
    },
    bottom:{
        height:80,
        backgroundColor:'white',
        justifyContent:'center'
    },
    text:{
        fontSize:24,
        marginLeft:20
    }
})