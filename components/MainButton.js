import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

const  {width, height} = Dimensions.get("window");


export default class MainButton extends Component{
  static defaultProps = {
    title: 'untitled',
    buttonColor: '#f0f0f0',
    titleColor: '#4d4d4d',
    onPress: () => null,
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <TouchableOpacity 
        style={[styles.button,{backgroundColor: this.props.buttonColor}]}
        onPress={this.props.onPress}>

        <Text style={[styles.title,{color: this.props.titleColor, fontSize: moderateScale(20),}]}>
          {this.props.title}
        </Text>

      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: moderateScale(320),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 25,
    height:height*0.08,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
      shadowRadius: 1, //IOS
      elevation: 2, // Android
  },
  title: {
    fontSize: 18,
  },
});