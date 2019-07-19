import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import CharButtonN from '../components/CharButtonN.js';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

class CharInput extends Component {

    state = {
        newChar: '',
        isFocused: false
    }
    handleFocus = event => {
      this.setState({ isFocused: true});
      if (this.props.onFocus){
        this.props.onFocus(event);
      }
    };
    handleBlur = event => {
      this.setState({ isFocused: false});
      if (this.props.onBlur){
        this.props.onBlur(event);
      }
    }


    constructor(props) {
        super(props);
        this.state = {text: ''};
        this.state = {disabled: false};
        this.state = {newChar: ''};
      }


    addNewChar = () => {
        if(this.state.newChar) {
            this.props.addChar(this.state.newChar);
            this.setState({
                newChar: ''
            });
        }
    }
render() {
  const {isFocused} = this.state;
  const {onFocus, onBlur} = this.props;
      return (
<>
            <View style={styles.selectView}>

            <TextInput
                style={[styles.input, {borderColor: isFocused ? '#75A9D6':'#DCDCDC'}]} 
                placeholder={"직접입력"}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                placeholderTextColor={"#DCDCDC"}
                value={this.state.newChar}
                onChangeText={(newChar) => this.setState({newChar})}
                maxLength={8}
            />   



            
              <View style={styles.BT}>
                <TouchableOpacity
                style={styles.AB}
                onPressOut={this.addNewChar}
                >
                
                <Text style={{color : 'white', zIndex:999}}>추가</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            
            </>
      )
}
}
const styles = StyleSheet.create({
 
   
    input: {
      height:45,
      flex:3,
      padding: 10,
      
      borderBottomWidth: 1,
      fontSize: 17,
      marginRight:15,
    },
   
    selectView:{
      flexDirection: "row",
      marginTop:20,
      padding: scale(10),
    },
    STBT:{
      flex:1,
      paddingLeft: 50,
      marginLeft:50,
    },
    AB:{
      zIndex:999,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:"#ADCDE9",
      height: 40,
      width: moderateScale(50),
      
    borderColor:'#f1b3ae', 
    borderRadius:10,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
      shadowRadius: 1, //IOS
      elevation: 2, // Android 
    },
    BT:{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',

    }
  });
  export default CharInput;