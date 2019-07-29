import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Text, View, Image, Platform } from 'react-native';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';
import HeaderScrollView from 'react-native-header-scroll-view';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const { width, height } = Dimensions.get("window");


export default class ClubModify extends React.Component {
  static navigationOptions = {
    header: null
  }
  render() {

    return (
      <>
        <TouchableOpacity style={{ position: 'absolute', width: width * 0.2, height: height * 0.1, top: 15, left: 10, zIndex: 1 }}
          onPress={() => { this.props.navigation.goBack() }}>
          <Ionicons name="ios-arrow-back" size={width * 0.08} color="black" />
        </TouchableOpacity>



        <View style={styles.container}>

          <TouchableOpacity style={{}}
            onPress={() => this._gotoSignUp()} >
            <View style={styles.box}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', }}>
                  <View style={styles.logo}>
                    <EvilIcons name="user" size={width * 0.12} />
                  </View>
                  <View style={styles.content}>
                    <View style={styles.title}>
                      <Text style={{ fontSize: width * 0.07, fontWeight: 'bold', }}>정보 수정</Text>
                    </View>
                    <View style={styles.sub}>
                      <Text style={{ fontSize: width * 0.032, color: '#BBBBBB' }}>우리 동아리는요!</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <View style={{ width: "100%", height: height * 0.05 }} />

          <TouchableOpacity style={{}}
            onPress={() => this._gotoChar()} >
            <View style={styles.box}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', }}>
                  <View style={styles.logo}>
                    <FontAwesome name="hashtag" size={width * 0.10} />
                  </View>
                  <View style={styles.content}>
                    <View style={styles.title}>
                      <Text style={{ fontSize: width * 0.07, fontWeight: 'bold', }}>특징 수정</Text>
                    </View>
                    <View style={styles.sub}>
                      <Text style={{ fontSize: width * 0.032, color: '#BBBBBB' }}>이렇게 다양한 매력을 가졌답니다 :)</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <View style={{ width: "100%", height: height * 0.05 }} />

          <TouchableOpacity style={{}}
            onPress={() => this._gotoRecord()} >
            <View style={styles.box}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', }}>
                  <View style={styles.logo}>
                    <AntDesign name="slack" size={width * 0.10} />
                  </View>
                  <View style={styles.content}>
                    <View style={styles.title}>
                      <Text style={{ fontSize: width * 0.07, fontWeight: 'bold', color:'#343434' }}>기록 수정</Text>
                    </View>
                    <View style={styles.sub}>
                      <Text style={{ fontSize: width * 0.032, color: '#BBBBBB' }}>이야기 책 속의 여행처럼, 우리 함께 할래요?</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>


        </View>


      </>
    );
  }

  _gotoSignUp = () => {
    const { navigation } = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    userNo = userNo.replace(/[^0-9]/g, '');

    this.props.navigation.navigate('SignUp', {
      userNo: userNo,
      from: 'm'
    })
  }

  _gotoChar = () => {
    const { navigation } = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    userNo = userNo.replace(/[^0-9]/g, '');

    this.props.navigation.navigate('CharChoice', {
      userNo: userNo,
      from: 'm'
    })
  }

  _gotoRecord = () => {
    const { navigation } = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    userNo = userNo.replace(/[^0-9]/g, '');

    this.props.navigation.navigate('SignUpRecord', {
      userNo: userNo,
      from: 'm'
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    width: width * 0.9,
    height: height * 0.1,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS 
    elevation: 2,
  },
  logo: {
    marginHorizontal: width * 0.03,
    justifyContent: 'center',

  },
  content: {
    flex: 1,
    flexWrap: "wrap"
  },
  title: {

    justifyContent: 'center'
  },
  sub: {
    marginLeft: width * 0.007,
    justifyContent: 'center'
  }

});