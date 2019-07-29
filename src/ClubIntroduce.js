import React, { Component } from 'react';
import { StyleSheet, Platform, Text, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import * as axios from 'axios';
import ClubChars from '../components/ClubChars';
import { Ionicons } from '@expo/vector-icons';
import HeaderScrollView from 'react-native-header-scroll-view';

const { width, height } = Dimensions.get("window");

export default class ClubIntroduce extends React.Component {


  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      clubName: '',
      clubWellcome: '',
      clubPhoneNumber: '',
      clubIntroduce: '',
      clubLogo: null,
      clubMainPicture: null,
      clubChar: []
    };
  }

  componentWillMount = () => {
    this._getDatas();
    this._getChars();

    const { navigation } = this.props;
    var clubLogo = navigation.getParam('clubLogo', 'NO-ID');
    var clubMainPicture = navigation.getParam('clubMainPicture', 'NO-ID');
    this.setState({
      clubLogo: clubLogo,
      clubMainPicture: clubMainPicture
    })
  };


  _getDatas = () => {
    const t = this;
    const { navigation } = this.props;
    var clubName = navigation.getParam('clubName', 'NO-ID');
    var school = navigation.getParam('school', 'NO-ID');

    this.setState({ clubName: clubName });


    // 데이터 가져오기
    axios.post('http://dkstkdvkf00.cafe24.com/GetClubIntroduce.php', {
      clubName: clubName,
      school: school
    })
      .then(function (response) {
        t._setDatas(response);
      });
  }

  _setDatas = response => {

    var str = JSON.stringify(response.data.message.clubWellcome);;
    var clubWellcome = str.substring(1, str.length - 1);
    this.setState({
      clubWellcome: clubWellcome
    });

    var str = JSON.stringify(response.data.message.clubPhoneNumber);;
    var clubPhoneNumber = str.substring(1, str.length - 1);
    this.setState({
      clubPhoneNumber: clubPhoneNumber
    });

    var str = JSON.stringify(response.data.message.clubIntroduce);;
    var clubIntroduce = str.substring(1, str.length - 1);
    this.setState({
      clubIntroduce: clubIntroduce
    });

    // var str = JSON.stringify(response.data.message.clubLogo);;
    // console.log(str)
    // var clubLogo = str.substring(1, str.length-1);
    //     this.setState({
    //         clubLogo: clubLogo
    //     });

    // var str = JSON.stringify(response.data.message.clubMainPicture);;
    // console.log(str)
    // var clubMainPicture = str.substring(1, str.length-1);
    //     this.setState({
    //         clubMainPicture: clubMainPicture
    //     });
  }



  //특성 가져오기
  _getChars = () => {
    const t = this;
    const { navigation } = this.props;
    const { clubChar } = this.state;
    var clubName = navigation.getParam('clubName', 'NO-ID');
    var school = navigation.getParam('school', 'NO-ID');


    // 데이터 가져오기
    axios.post('http://dkstkdvkf00.cafe24.com/GetClubChars.php', {
      clubName: clubName,
      school: school,
    })
      .then((result) => {
        const response = result.data;
        var clubCharArray = new Array();

        response.forEach(row => {
          clubCharArray.push(row.chars);
        });

        this.setState({
          clubChar: clubChar.concat(clubCharArray),
        });



      });

  }


  render() {
    let { clubName, clubWellcome, clubPhoneNumber, clubIntroduce, clubChar, clubLogo, clubMainPicture } = this.state;
    console.log(clubMainPicture)
    return (
      <>
        <View style={styles.container}>
          <TouchableOpacity style={{ position: 'absolute', width: width * 0.2, height: height * 0.1, top: 15, left: 10, zIndex: 1 }}
            onPress={() => { this.props.navigation.goBack() }}>
            <Ionicons name="ios-arrow-back" size={width * 0.08} color="black" />
          </TouchableOpacity>

          <HeaderScrollView
            headerContainerStyle={{ height: height * 0.08, }}
            headlineStyle={{ paddingTop: 23, textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', fontSize: width * 0.05, }}
            headerComponentContainerStyle={{ justifyContent: 'center', height: height * 0.08, }}
            titleStyle={{ fontSize: width * 0.08 }}
            scrollEnabled={false}
            fadeDirection="up"
            title="동아리 소개">

            <Text style={styles.blank}>ㅁㅁㅁㅁ</Text>
            <Text style={styles.text1}>동아리 로고, 메인 사진</Text>

            <View style={{ alignItems: 'center', marginTop: 5, marginHorizontal: width * 0.05 }} onPress={this._pickMainPicture}>

              <Image style={{ marginTop: 5, width: width * 0.9, height: height * 0.23, borderRadius: 15, backgroundColor: '#CEE1F2' }}
                source={{ uri: clubMainPicture }} />
            </View>

            <View style={{ alignItems: 'center', top: -width * 0.07, zIndex: 1, }} >
              {
                <View style={{ width: width * 0.27, height: width * 0.27, top: -width * 0.07, zIndex: 1, borderRadius: width * 0.27 * 0.5, }} >
                  <Image style={{ backgroundColor: 'green', width: width * 0.27, height: width * 0.27, borderRadius: width * 0.27 * 0.5 }} source={{ uri: clubLogo }} />

                </View>
              }
            </View>


            <View style={{ paddingHorizontal: width * 0.05 }}>
              <View style={styles.block}>
                <Text style={styles.text} >동아리 이름</Text>

                <View style={styles.input}>
                  <Text style={styles.textIn}>
                    {clubName}
                  </Text>
                </View>
              </View>

              <View style={styles.block}>
                <Text style={styles.text} >동아리 소개</Text>
                <View style={styles.input}>
                  <Text style={styles.textIn}>
                    {clubIntroduce}
                  </Text>
                </View>
              </View>

              <View style={styles.block}>
                <Text style={styles.text} >연락처</Text>
                <View style={styles.input}>
                  <Text style={styles.textIn}>
                    {clubPhoneNumber}
                  </Text>
                </View>
              </View>

            </View>





            <View style={styles.title}>



              <Text style={styles.clubTitle}>{clubName}</Text>

              <Text style={styles.clubChar}>
                {clubChar.map((chars, i) => {
                  return (<ClubChars
                    chars={clubChar[i]}
                    key={i} />);
                })}
              </Text>

            </View>



          </HeaderScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  blank: {
    fontSize: 25,
    color: 'white'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',

  },

  input: {
    borderRadius: 8,
    width: '100%',
    padding: 7,
    borderColor: Platform.OS === 'ios' ? 'white' : 'transparent',
    borderWidth: 1,
    shadowColor: 'rgba(0,0,0, .2)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1.5,
    marginTop: 5
  },
  text: {
    color: '#ADCDE9',
    fontSize: width * 0.06,
    fontWeight: 'bold'

  },
  text1: {
    color: '#ADCDE9',
    fontSize: width * 0.06,
    fontWeight: 'bold',
    paddingHorizontal: width * 0.05
  },
  textIn:{
    fontSize: width*0.04
  },
  title: {
    width: width,
    height: height * 0.6,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    paddingTop: 25
  },
  clubImage: {
    width: '90%',
    height: '65%',
    resizeMode: 'cover',
    backgroundColor: '#323232',
    borderRadius: 15,

  },
  logo: {
    height: 70,
    width: 70,
    resizeMode: 'cover',
    backgroundColor: '#fff',
    borderRadius: 35,
    top: -30,

    zIndex: 1
  },
  toDos: {
    alignItems: "center"
  },
  block: {
    paddingBottom: 30
  },
  introduce: {
    height: 120
  },
  button: {
    height: 60,
    marginTop: 30,
    paddingHorizontal: width * 0.03

  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
});