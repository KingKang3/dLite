import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default class RegisterButtonN extends Component{
  static defaultProps = {
    buttonColor: '#85f1ff',
    titleColor: '#fff',
    onPress: () => null,
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <TouchableOpacity 
      disabled={true}
      style={[styles.button,{backgroundColor: this.props.buttonColor}]}
      onPress={this.props.onPress}>

        <Text style={[styles.title, {color: this.props.titleColor}]}>
          {this.props.title}
        </Text>

      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    opacity: 0.7
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color:'#fff'
  },
});