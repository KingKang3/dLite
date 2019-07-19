import React, {Component} from 'react';
import {StyleSheet, Image, Text, Platform,Dimensions, View, TouchableOpacity, TextInput } from 'react-native';
import Picture from '../components/Picture';
import AutoHeightImage from 'react-native-auto-height-image';
import * as axios from 'axios';
import { ImagePicker, Constants, Permissions } from 'expo';


export default class RRP extends React.Component {
    constructor(props){
        super(props);
        this.state={
          image:null,
          toDoValue: props.text 
        };
      }
      _pickImage = async () => {
        const permissions = Permissions.CAMERA_ROLL;
        const { status } = await Permissions.askAsync(permissions);
        
        console.log(permissions, status);
        if(status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
              aspect: [4, 3],
              base64: true,
              quality: 0.5
              });
          
              if (!result.cancelled) {
                // this.setState({ clubMainPicture: 'data:image/jpg;charset=utf-8;base64,'+resultEncode });
                this.setState({ image: `data:image/jpg;base64,` + result.base64 });
                // this.setState({ clubMainPicture: result.uri });
              }
        }
      }


    render() {
        const {image, toDoValue } = this.state;
        const { text, id, deleteToDo, isCompleted } = this.props;
        var {height, width} = Dimensions.get('window');
      return (
        <>
            <View style={styles.container}>
                <View style={styles.top}/>
                    <View style={styles.body}>
                    <TouchableOpacity  onPress={this._pickImage}>
                    { image === null ?
                      <AutoHeightImage
                      width={width-42}
                      style={{flex:1,}}
                      source={require('../images/addPhoto.png')}
                      />
                      :
                      <AutoHeightImage
                      width={width-42}
                      style={{flex:1,}}
                      source={{ uri : image}}
                      />
                  }
                    </TouchableOpacity>
                    </View>
                        <View style={styles.bottom}>
                            <TextInput 
                             placeholder={text}
                             placeholderTextColor={"#bebebe"}
                             multiline={false}
                             style={styles.text}>
                               
                            </TextInput>
                        </View>
            </View>


            


        </>
      )
    }
}

const styles = StyleSheet.create ({
    container2:{
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