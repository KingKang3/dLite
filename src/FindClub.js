import React, { Component } from 'react';
import { StyleSheet, Image, Dimensions, Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import ClubDiv from '../components/ClubDiv';
import ClubView_dLite from '../components/ClubView_dLite';
import { Icon } from 'react-native-elements'
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';
import { Header } from 'react-navigation';
import HeaderScrollView from 'react-native-header-scroll-view';
import { Ionicons } from '@expo/vector-icons';


const { width, height } = Dimensions.get("window");
const MIN_HEIGHT = 50;
const MAX_HEIGHT = 50.5;
export default class FindClub extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTintColor: "black",
    headerTransparent: true,
    headerStyle: { height: Platform.OS === 'ios' ? 70 : 10, elevation: 0, shadowColor: 'transparent', borderBottomWidth: 0, paddingBottom: 10, paddingTop: Platform.OS === 'ios' ? 40 : 5 },
    header: null
  })

  constructor(props) {
    super(props);

    this.state = {
      schoolName: '',
      showNavTitle: false
    };
  }


  componentWillMount = () => {

    const { navigation } = this.props;
    const schoolName = navigation.getParam('schoolName', 'NO-ID');
    this.setState({ schoolName: schoolName })
  };


  render() {
    let { schoolName } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ position: 'absolute', width: width * 0.2, height: 30, top: 22, left: 10, zIndex: 1 }}
                onPress={() => { this.props.navigation.goBack() }}><Ionicons name="ios-arrow-back" size={28} color="black" /></TouchableOpacity>
       
        {/* 전체화면 스크롤 */}
        <HeaderScrollView
                headerContainerStyle={{height:height * 0.08, }}
                headlineStyle={{paddingTop:23, textAlign:'center',justifyContent:'center', alignItems:'center', alignSelf:'center',fontSize:width*0.05,  }}
                headerComponentContainerStyle={{justifyContent:'center', height:height * 0.08, }}
                titleStyle={{fontSize:width*0.08, marginBottom:10}}
                fadeDirection="up" 
                title="동아리 찾기"
                >

          {/* 맨 위 d:Lite */}
          <ClubView_dLite />
          {/* 대학교 이름과 동아리 종류 볼수있는 아이콘 */}
          <View style={styles.div}>
            <Text style={styles.school}>울산대학교</Text>
            {/* <TouchableOpacity>
                <AntDesign name="bars" size={25} color="#0A6EFF" />
              </TouchableOpacity> */}
          </View>

          {/* 종류에 따라 동아리 구분 */}
          <ClubDiv
            clubKind={'예술 공연'}
            school={schoolName}
            navigation={this.props.navigation}
          />
          <ClubDiv
            clubKind={'예술 교양'}
            school={schoolName}
            navigation={this.props.navigation}
          />
          <ClubDiv
            clubKind={'체육 구기'}
            school={schoolName}
            navigation={this.props.navigation}
          />
          <ClubDiv
            clubKind={'체육 생활'}
            school={schoolName}
            navigation={this.props.navigation}
          />
          <ClubDiv
            clubKind={'봉사'}
            school={schoolName}
            navigation={this.props.navigation}
          />
          <ClubDiv
            clubKind={'국제'}
            school={schoolName}
            navigation={this.props.navigation}
          />
          <ClubDiv
            clubKind={'종교'}
            school={schoolName}
            navigation={this.props.navigation}
          />
          <ClubDiv
            clubKind={'학술'}
            school={schoolName}
            navigation={this.props.navigation}
          />
          <ClubDiv
            clubKind={'기타'}
            school={schoolName}
            navigation={this.props.navigation}
          />

        </HeaderScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scroll: {
    flex: 1,
    paddingTop: 10
  },
  div: {
    height: 50,
    // backgroundColor:'#dcdcdc',
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  school: {
    fontSize: width*0.06
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    opacity: 0,
  },
  navTitle: {
    color: 'black',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 30,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
});