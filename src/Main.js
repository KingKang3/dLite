import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import MainButton from '../components/MainButton';
import FindClub from './FindClub';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

const  {width, height} = Dimensions.get("window");


export default class Login extends React.Component {
  static navigationOptions = {
      header : null,
    };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} />

        {/* 로고랑 설명 */}
        <View style={styles.title}>
        
        <Image
            style={{height:'70%',width:'70%',resizeMode:'contain'}}
            source={require('../images/logo3.png')}/>
     
     <View style={{ paddingTop:scale(10)}}>
        <Text style={{color:'#3B3B3B',fontSize: moderateScale(20),}}>우리 학교에는 어떤 동아리가?</Text>
        
        </View>
        </View>
        {/* 버튼2개 */}
        <View style={styles.content}>
            <MainButton
                buttonColor={'#CEE1F2'}
                title={'동아리 생성 수정'}
                titleColor={'#3B3B3B'}
                onPress={() => this.props.navigation.navigate('codeConfirm')}/>
            <View style={{width:"100%",height:10}} />
            <MainButton
                buttonColor={'#CEE1F2'}
                title={'일반'}
                titleColor={'#3B3B3B'}
                onPress={() => this.props.navigation.navigate('FindClub', {
                  schoolName: '울대'
                })}/>
        </View>
    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    width:'100%',
    height:'15%',
    // backgroundColor: '#ff9a9a',
  },
  title: {
    width:'100%',
    height:'30%',
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: '#9aa9ff'
  },
  content: {
    flex: 1,
    paddingTop:scale(150),
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor: '#d6ca1a',
  },
  footer: {
    width:'100%',
    height:'5%',
    // backgroundColor: '#1ad657'
  },
});