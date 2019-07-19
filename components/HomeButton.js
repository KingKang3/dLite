import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image
} from 'react-native';
import { scale, moderateScale, verticalScale} from '../components/Scaling';


export default class HomeButton extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
        <TouchableOpacity 
            style={{width:100, height:100, alignItems:'flex-end'}}
            onPress={() => this.props.navigation.navigate('Main')}
        ><Image
            style={{height:40,width:40,resizeMode:'cover', marginRight:20, marginTop:30}} 
            source={require('../images/home.png')}
            />
        </TouchableOpacity>
// ()=>this.props.navigation.navigate('Main')
    )
  }
}
