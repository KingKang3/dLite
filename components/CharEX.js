import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View
} from 'react-native';

export default class CharEX extends Component{
  static defaultProps = {
    title: 'untitled',
    buttonColor: '#28E7FF',
    onPress: () => null,
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <View
      style={styles.button}
      >

          <Text style={[styles.title]}>
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
    marginBottom: 10,
    borderRadius: 20,
    height: 40, 
    backgroundColor: '#fff',
    paddingRight: 15,
    paddingLeft:15,
    marginRight:10,
    borderColor: '#DADADA',
    borderWidth:1
  },
  title: {
    fontSize: 13,
    color: '#BBBBBB'
  }
});