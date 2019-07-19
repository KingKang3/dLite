import React, {Component} from 'react';
import {StyleSheet, Dimensions, TouchableOpacity, Text, View, Image, Platform} from 'react-native';
import MainButton from '../components/MainButton';

const  {width, height} = Dimensions.get("window");


export default class ClubModify extends React.Component {
  static navigationOptions = {
   header:null
}
  render() {
    
    return (
      <View style={styles.container}>
         <TouchableOpacity style={{position: 'absolute', width:width*0.2, height:30, top:20,left:10, zIndex:1}} onPress={() => { this.props.navigation.goBack() }}><Text>←back</Text></TouchableOpacity>
            <MainButton
                buttonColor={'#CEF6CE'}
                title={'정보 수정'}
                onPress={() => this._gotoSignUp()}/>
            <View style={{width:"100%",height:20}} />
            <MainButton
                buttonColor={'#CEE3F6'}
                title={'특성 수정'}
                onPress={() => this._gotoChar()}/>
            <View style={{width:"100%",height:20}} />
            <MainButton
                buttonColor={'#E6E6E6'}
                title={'기록 수정'}
                onPress={() => this._gotoRecord()}/>
       
      </View>
    );
  }

  _gotoSignUp = () => {
    const { navigation } = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    userNo = userNo.replace(/[^0-9]/g,'');

    this.props.navigation.navigate('SignUp', {
        userNo : userNo,
        from: 'm'
    })
  }

  _gotoChar = () => {
    const { navigation } = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    userNo = userNo.replace(/[^0-9]/g,'');

    this.props.navigation.navigate('CharChoice', {
        userNo : userNo,
        from: 'm'
    })
  }

  _gotoRecord = () => {
    const { navigation } = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    userNo = userNo.replace(/[^0-9]/g,'');

    this.props.navigation.navigate('SignUpRecord', {
        userNo : userNo,
        from: 'm'
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent : 'center',
    alignItems:'center'
  },
  
});