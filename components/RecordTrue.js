import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

export default class RecordTrue extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
            <TouchableOpacity 
              style={styles.true}
              onPress={this.props.onPress}
            >
                <Text style={styles.text1}>완료</Text>
            </TouchableOpacity>

    )
  }
}


const styles = StyleSheet.create({
  true:{
      flex:1,
      borderColor:'white',
      backgroundColor:'#28E7FF',
      alignItems:'center',
      justifyContent: 'center'
  },
  text1:{
      fontSize:25,
      color:'#fff',
      fontWeight:'700'
  }
});