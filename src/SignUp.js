import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Dimensions, Button, image, Image, Alert, ActivityIndicator, Platform } from 'react-native';
import ConfirmButton from '../components/ConfirmButton';
import ClubPicker from '../components/ClubPicker';
import ClubPickerM from '../components/ClubPickerM';
import ConfirmButtonN from '../components/ConfirmButtonN';
import * as axios from 'axios';
import { ImagePicker, Constants, Permissions } from 'expo';
import { scale, moderateScale, verticalScale } from '../components/Scaling';
import HeaderScrollView from 'react-native-header-scroll-view';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");


export default class SignUp extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      clubName: '',
      clubKind: '예술 공연',
      clubWellcome: '',
      clubPhoneNumber: '',
      clubIntroduce: '',
      clubMainPicture: null,
      userNo: '',
      clubLogo: null,
      isGetting: false,
    };
  }

  componentWillMount = async () => {
    if (this.props.navigation.getParam('from', 'NO-ID') == 'm') {
      await this._getDatas();
      // await this._getImage();
    }
  };


  // 데이터 가져오는 함수
  _getDatas = async () => {
    //userNo 가지고 오기
    const { navigation } = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    const t = this;


    // 데이터 가져오기
    await axios.post('http://dkstkdvkf00.cafe24.com/GetRegister.php', {
      userNo: userNo,
    })
      .then((response) => {
        t._setDatas(response);

      });

  }

  _getImage = async () => {
    const { clubLogo, clubMainPicture } = this.state;
    const { navigation } = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    const t = this;

    // 데이터 가져오기
    await axios.post('http://dkstkdvkf00.cafe24.com/getRegisterImage.php', {
      userNo: userNo,
    })
      .then((result) => {
        const response = result.data;
        var clubLogoArray = new Array();
        var clubMainPictureArray = new Array();

        response.forEach(row => {
          clubLogoArray.push(row.clubLogo);
          clubMainPictureArray.push(row.clubMainPicture);
        });

        this.setState({
          clubLogo: clubLogo.concat(clubLogoArray),
          clubMainPicture: clubMainPicture.concat(clubMainPictureArray),
        });
      });
    this.setState({ isGetting: true })
  }

  // 데이터 넣기
  _setDatas = response => {

    var str = JSON.stringify(response.data.message.clubName);;
    var clubName = str.substring(1, str.length - 1);
    this.setState({
      clubName: clubName
    });

    var str = JSON.stringify(response.data.message.clubWellcome);;
    var clubWellcome = str.substring(1, str.length - 1);
    this.setState({
      clubWellcome: clubWellcome
    });

    var str = JSON.stringify(response.data.message.clubKind);;
    var clubKind = str.substring(1, str.length - 1);
    this.setState({
      clubKind: clubKind
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

    var str = JSON.stringify(response.data.message.clubLogo);;
    var clubLogo = str.substring(1, str.length - 1);
    this.setState({
      clubLogo: clubLogo
    });

    var str = JSON.stringify(response.data.message.clubMainPicture);;
    var clubMainPicture = str.substring(1, str.length - 1);
    this.setState({
      clubMainPicture: clubMainPicture
    });

    this.setState({ isGetting: true })
  }


  // 로고 가져오기
  _pickLogo = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);
    const { clubLogo } = this.state;

    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5
      });

      if (!result.cancelled) {
        // this.setState({ clubLogo: clubLogo.concat(`data:image/jpg;base64,` + result.base64)});
        this.setState({ clubLogo: result.uri });
      }

    }
  }


  // 메인사진 가져오기
  _pickMainPicture = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);
    const { clubMainPicture } = this.state;

    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5
      });


      if (!result.cancelled) {
        // this.setState({ clubMainPicture: clubMainPicture.concat(`data:image/jpg;base64,` + result.base64)});
        this.setState({ clubMainPicture: result.uri });
      }
    }
  }


  // 처음 가입
  _insertRegister = async () => {
    //userNo 가지고 오기
    const { navigation } = this.props;
    var getUserNo = navigation.getParam('userNo', 'NO-ID');
    var getSchool = navigation.getParam('school', 'NO-ID');
    getUserNo = getUserNo.replace(/[^0-9]/g, '');
    getSchool = getSchool.substring(1, getSchool.length - 1);


    const { clubName, clubKind, clubWellcome, clubPhoneNumber, clubIntroduce,
      clubLogo, clubMainPicture } = this.state;

    if (clubName == '' || clubWellcome == '' || clubPhoneNumber == '' || clubIntroduce == '') {
      Alert.alert('내용을 채워주세요')

    } else {


      let formData = new FormData();
      formData.append('clubName', clubName);
      formData.append('clubKind', clubKind);
      formData.append('clubWellcome', clubWellcome);
      formData.append('clubPhoneNumber', clubPhoneNumber);
      formData.append('clubIntroduce', clubIntroduce);
      formData.append('userNo', getUserNo);
      formData.append('school', getSchool);


      if (clubLogo == null) {
        formData.append('clubLogo', null);
      } else {
        formData.append('clubLogo', { uri: clubLogo, name: 'image.png', type: 'image/png' });
      }

      if (clubMainPicture == null) {
        formData.append('clubMainPicture', null);
      } else {
        formData.append('clubMainPicture', { uri: clubMainPicture, name: 'image.png', type: 'image/png' });
      }


      // 데이터베이스에 넣기
      await fetch('http://dkstkdvkf00.cafe24.com/UserRegister.php', {
        method: 'POST',
        body: formData,
        header: {
          'content-type': 'multipart/form-data',
        }
      })


      this.props.navigation.navigate('CharChoice', {
        userNo: getUserNo
      })

    }
  }


  // 정보 수정 함수
  _updatRegister = async () => {

    //userNo 가지고 오기
    const { navigation } = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');


    const { clubName, clubKind, clubWellcome, clubPhoneNumber, clubIntroduce,
      clubLogo, clubMainPicture } = this.state;

    // 데이터베이스에 넣기
    await axios.post('http://dkstkdvkf00.cafe24.com/ModifySignUp.php', {
      clubName: clubName,
      clubKind: clubKind,
      clubWellcome: clubWellcome,
      clubPhoneNumber: clubPhoneNumber,
      clubIntroduce: clubIntroduce,
      clubLogo: clubLogo,
      clubMainPicture: clubMainPicture,
      userNo: userNo,
    })
      .then(function (response) {
        ms = response.data.message;
      });

    this.props.navigation.navigate('Main')
  }

  _btnPress = () => {
    if (this.props.navigation.getParam('from', 'NO-ID') == 'm') {
      this._updatRegister()
    } else {
      this._insertRegister()
    }
  }


  myCallback = (dataFromChild) => {
    this.setState({ clubKind: dataFromChild });
  }

  //테두리 색변경 효과
  state = {
    isFocused: false,
    isFocused1: false,
    isFocused2: false,
    isFocused3: false

  }

  handleFocus = () => this.setState({ isFocused: true })
  handleBlur = () => this.setState({ isFocused: false })

  handleFocus1 = () => this.setState({ isFocused1: true })
  handleBlur1 = () => this.setState({ isFocused1: false })

  handleFocus2 = () => this.setState({ isFocused2: true })
  handleBlur2 = () => this.setState({ isFocused2: false })

  handleFocus3 = () => this.setState({ isFocused3: true })
  handleBlur3 = () => this.setState({ isFocused3: false })



  render() {
    let { clubLogo, clubMainPicture, isGetting } = this.state;
    return (

      <>
        {
          (isGetting == false) && (this.props.navigation.getParam('from', 'NO-ID') == 'm') ?

            <ActivityIndicator size="large" style={styles.activityIndicator} />
            :
            <View style={styles.container}>
              <TouchableOpacity style={{ position: 'absolute', width: width * 0.2, height: height * 0.1, top: 15, left: 10, zIndex: 1 }}
                onPress={() => { this.props.navigation.navigate('codeConfirm') }}><Ionicons name="ios-arrow-back" size={width * 0.08} color="black" /></TouchableOpacity>

              <HeaderScrollView
                headerContainerStyle={{height:height * 0.08, }}
                headlineStyle={{paddingTop:23, textAlign:'center',justifyContent:'center', alignItems:'center', alignSelf:'center',fontSize:width*0.05,  }}
                headerComponentContainerStyle={{justifyContent:'center', height:height * 0.08, }}
                titleStyle={{fontSize:width*0.08}}
                fadeDirection="up" 
                title="동아리 소개"
                >
                <Text style={styles.blank}>ㅁㅁㅁㅁ</Text>

                <Text style={styles.text1}>동아리 로고, 메인 사진</Text>


                <TouchableOpacity style={{ alignItems: 'center', marginTop: 5, marginHorizontal: width * 0.05 }} onPress={this._pickMainPicture}>
                  <Image style={{ width: width*0.1, height:width*0.1,position: 'absolute', zIndex: 1, right: -15, bottom: -15 }} source={require('../images/pAdd.png')} />
                  {
                    (clubMainPicture == null) || (clubMainPicture == '') ?
                      <View style={{ marginTop: 5, width: width * 0.9, height: height * 0.23, borderRadius: 15, backgroundColor: '#CEE1F2' }} />
                      :
                      clubMainPicture &&
                      <Image style={{ marginTop: 5, width: width * 0.9, height: height * 0.23, borderRadius: 15, backgroundColor: '#CEE1F2' }}
                        source={{ uri: clubMainPicture }} />
                  }
                </TouchableOpacity>



                <View style={{ alignItems: 'center', top: -width * 0.07, zIndex: 1 }} >
                  {
                    (clubLogo == null) || (clubLogo == '') ?
                      <TouchableOpacity onPress={this._pickLogo} style={{ width: width * 0.27, height: width * 0.27, top: -width * 0.07, zIndex: 1, backgroundColor: '#ADCDE9', borderRadius: width * 0.27*0.5 }}   >
                        <Image style={{ width: width*0.1, height:width*0.1, position: 'absolute', zIndex: 1, right: -5, bottom: -5 }} source={require('../images/pAdd.png')} />
                      </TouchableOpacity>
                      :
                      <View style={{ width: width * 0.27, height: width * 0.27, top: -width * 0.07, zIndex: 1, borderRadius: width * 0.27*0.5, }} >
                        <Image style={{ width: width * 0.27, height: width * 0.27, borderRadius: width * 0.27*0.5 }} source={{ uri: clubLogo }} />
                        <Image style={{ width: width*0.1, height:width*0.1,position: 'absolute', zIndex: 1, right: -5, bottom: -5 }} source={require('../images/pAdd.png')} />
                      </View>
                  }
                </View>



                <View style={{ paddingHorizontal: width * 0.05 }}>
                  <View style={styles.block}>
                    <Text style={[styles.text, {
                      color: this.state.isFocused
                        ? '#000000'
                        : '#8d97a5',

                    }]} >동아리 이름</Text>
                    <TextInput
                      onFocus={this.handleFocus}
                      onBlur={this.state.clubName.length == 0 ? this.handleBlur : null}
                      style={[styles.input, {
                        borderColor: this.state.isFocused
                          ? Platform.OS === 'ios' ? 'white' : 'transparent'
                          : '#DCDCDC',
                        borderWidth: 1,
                        shadowColor: this.state.isFocused
                          ? 'rgba(0,0,0, .2)'
                          : null, // IOS
                        shadowOffset: this.state.isFocused
                          ? { height: 1, width: 1 }
                          : null, // IOS
                        shadowOpacity: this.state.isFocused
                          ? 1
                          : null, // IOS
                        shadowRadius: this.state.isFocused
                          ? 1
                          : null, // IOS
                        elevation: this.state.isFocused
                          ? 2
                          : null, // IOS
                      }]}
                      onChangeText={(clubName) => this.setState({ clubName })}
                      maxLength={20}
                      value={this.state.clubName}
                      autoCorrect={false}
                    />
                  </View>
                  <View style={styles.block}>
                    <Text style={styles.text}>동아리 종류</Text>
                    <View style={{ width: 160, }}>
                      {this.props.navigation.getParam('from', 'NO-ID') == 'm'
                        ?
                        <ClubPickerM
                          clubKind={this.state.clubKind}
                          callbackFromParent={this.myCallback} />
                        :
                        <ClubPicker
                          callbackFromParent={this.myCallback} />
                      }
                    </View>
                  </View>
                  <View style={styles.block}>
                    <Text style={[styles.text, {
                      color: this.state.isFocused1
                        ? '#000000'
                        : '#8d97a5',

                    }]} >동아리 소개</Text>
                    <TextInput
                      onFocus={this.handleFocus1}
                      onBlur={this.state.clubIntroduce.length == 0 ? this.handleBlur1 : null}
                      style={[styles.input, styles.introduce, {
                        borderColor: this.state.isFocused
                          ? Platform.OS === 'ios' ? 'white' : 'transparent'
                          : '#DCDCDC',
                        borderWidth: 1,
                        shadowColor: this.state.isFocused
                          ? 'rgba(0,0,0, .2)'
                          : null, // IOS
                        shadowOffset: this.state.isFocused
                          ? { height: 1, width: 1 }
                          : null, // IOS
                        shadowOpacity: this.state.isFocused
                          ? 1
                          : null, // IOS
                        shadowRadius: this.state.isFocused
                          ? 1
                          : null, // IOS
                        elevation: this.state.isFocused
                          ? 2
                          : null, // IOS
                      }]}
                      multiline={true}
                      onChangeText={(clubIntroduce) => this.setState({ clubIntroduce })}
                      maxLength={100}
                      autoCorrect={false}
                      value={this.state.clubIntroduce}
                    />
                  </View>
                  
                  <View style={styles.block}>
                    <Text style={[styles.text, {
                      color: this.state.isFocused3
                        ? '#000000'
                        : '#8d97a5',

                    }]} >연락 가능 연락처</Text>
                    <TextInput
                      onFocus={this.handleFocus3}
                      onBlur={this.state.clubPhoneNumber.length == 0 ? this.handleBlur3 : null}
                      style={[styles.input, {
                        borderColor: this.state.isFocused
                        ? Platform.OS === 'ios' ? 'white' : 'transparent'
                        : '#DCDCDC',
                      borderWidth: 1,
                      shadowColor: this.state.isFocused
                        ? 'rgba(0,0,0, .2)'
                        : null, // IOS
                      shadowOffset: this.state.isFocused
                        ? { height: 1, width: 1 }
                        : null, // IOS
                      shadowOpacity: this.state.isFocused
                        ? 1
                        : null, // IOS
                      shadowRadius: this.state.isFocused
                        ? 1
                        : null, // IOS
                      elevation: this.state.isFocused
                        ? 2
                        : null, // IOS
                      }]}
                      multiline={true}
                      onChangeText={(clubPhoneNumber) => this.setState({ clubPhoneNumber })}
                      value={this.state.clubPhoneNumber}
                      maxLength={100}
                      autoCorrect={false}
                    />
                  </View>
                </View>
                <View style={styles.button}>
                  {(this.state.clubName.length == 0 && this.state.clubWellcome.length == 0 && this.state.clubPhoneNumber.length == 0)
                    ?
                    <ConfirmButtonN buttonColor={'#CEE1F2'} titleColor={'#BBBBBB'} title={'확인'} />
                    :
                    <ConfirmButton
                      buttonColor={'#ADCDE9'} titleColor={'#3B3B3B'}
                      title={'확인'}
                      onPress={() => this._btnPress()} />
                  }
                </View>

              </HeaderScrollView>
            </View>

        }


      </>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },

  input: {
    borderRadius: 8,
    width: '100%',
    padding: 7,
    borderColor: "#32B8FF",
    borderWidth: 1,
    fontSize: width*0.04,
    marginTop: 5
  },
  text: {
    fontSize: width*0.04,

  },
  text1: {
    fontSize: width*0.04,
    paddingHorizontal: width * 0.05
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
  blank: {
    fontSize: 25,
    color: 'white'
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
});