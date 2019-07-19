import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View
} from 'react-native';

export default class RegisterButton extends Component{
  static defaultProps = {
    buttonColor: '#28E7FF',
    titleColor: '#fff',
    onPress: () => null,
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <View 
      style={[styles.button,{backgroundColor: this.props.buttonColor}]}
     >

        <Text style={[styles.title, {color: this.props.titleColor}]}>
          {this.props.title}
        </Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60
  },
  title: {
    fontSize: 20,
    fontWeight: "700"
  },
});