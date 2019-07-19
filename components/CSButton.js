import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {Icon} from 'react-native-elements'
class CSButton extends Component {
   render() {
      const { text, onPress} = this.props;
      return (
         <>
         
         <Icon
                name='plus'
                        type='entypo'
                color='#2eaeff'
                        onPress={() => onPress()}
                        reverse
                        raised
                        containerStyle={{zIndex: 999, position: 'absolute', bottom:120, right: 20 }}
              />
        
         </>
      );
   }
}

CSButton.propTypes = {
  
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize:20,
   color: '#ffffff',
   textAlign: 'center'
  },
  
  buttonStyle: {
      flex:1,
      zIndex: 999,
      borderWidth:1, 
    borderColor:'rgba(0,0,0,0.2)', 
    alignItems:'center', 
    justifyContent:'center', 
    width:50, 
    height:50, 
    backgroundColor:'#0083f0', 
      borderRadius:100, 
      position: 'absolute',
      bottom:120, right: 20,
      shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
      shadowRadius: 1, //IOS
      elevation: 2, // Android
      
  }
});

export default CSButton;