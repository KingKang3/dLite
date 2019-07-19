import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default class ConfirmButtonN extends Component{
  static defaultProps = {
    buttonColor: '#CDE0F1',
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
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 15,
    height: 50,
    opacity: 0.3,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
      shadowRadius: 1, //IOS
      elevation: 2, // Android 
  },
  title: {
    fontSize: 20,
    fontWeight: "700"
  },
});