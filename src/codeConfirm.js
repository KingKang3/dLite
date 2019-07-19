import React, {Component} from 'react';
import {StyleSheet,Dimensions, View, Text, Platform,BackHandler,TouchableOpacity} from 'react-native';
import ConfirmButton from '../components/ConfirmButton';
import ConfirmButtonN from '../components/ConfirmButtonN';
import * as axios from 'axios';
import { TextField } from 'react-native-material-textfield';
import HeaderScrollView from 'react-native-header-scroll-view';
import { HeaderBackButton } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

const  {width, height} = Dimensions.get("window");

export default class codeConfirm extends React.Component {


  static navigationOptions = ({ navigation, screenProps }) => ({
    
    header: null
    
});

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {userCode: ''};
  }

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
  this.props.navigation.navigate('Main');
  return true;
}


  render() {
    let { code } = this.state;
    return (
      <>
      <TouchableOpacity style={{position: 'absolute', width:width*0.2, height:30, top:20,left:10, zIndex:1}} 
                        onPress={() => { this.props.navigation.navigate('Main') }}><Ionicons name="ios-arrow-back" size={28} color="black" /></TouchableOpacity>
      <View style={styles.container}>
      
      <HeaderScrollView 
      scrollEnabled={false}
          fadeDirection="up"
          title="코드 입력">
      
        <View style={styles.header}></View>
        {/* 코드입력부분 */}
        <View style={styles.title}>
          {/* <Text style={styles.codeInput}>코드입력</Text> */}
          <TextField
         title='발급받은 코드를 입력해 주세요.'
            label='코드입력'
              returnKeyType={"done"}
              autoCorrect={false}
              value={code}
              multiline={false}
              onChangeText={(userCode) => this.setState({userCode})}
            />
        </View>

        <View style={styles.content}/>
        </HeaderScrollView>
        {/* 확인 버튼 */}
        <View style={styles.footer}>
        {(this.state.userCode.length==0 )?<ConfirmButtonN title={'확인'}/>:<ConfirmButton title={'확인'} onPress={this.login} /> }
        </View>
        
      </View>
      
      </>
    );
  }


 
    // 동아리 생성 되어있을 때
    _goToCodeConfirm = () => {
      const t = this;
      const {userCode} = this.state;

      axios.post('http://dkstkdvkf00.cafe24.com/GetUserNo.php',{
      userCode:userCode
    })
    .then(function (response) {
      userNo = JSON.stringify(response.data.message.userNo)
        t.props.navigation.navigate('ClubModify', {
          userNo: userNo
        })
    });
    }

    // 동아리 생성 안되어있을 때
    _goToSignUp = () => {
      const t = this;
      const {userCode} = this.state;

      axios.post('http://dkstkdvkf00.cafe24.com/GetUserNo.php',{
      userCode:userCode
    })
    .then(function (response) {
      userNo = JSON.stringify(response.data.message.userNo)
      school = JSON.stringify(response.data.message.school)
      setTimeout(()=>{
        t.props.navigation.navigate('SignUp', {
          userNo: userNo,
          school: school
        },1000)
      })
        
    });
      
     
    }
  
  
    // 동아리 생성 여부에 따라 가는 곳 다르게
    _getClub = userCode => {
      const t = this;
      axios.post('http://dkstkdvkf00.cafe24.com/CodeGetClub.php',{
      userCode:userCode
    })
    .then(function (response) {
        ms = response.data.message;
        {ms === 'true' ? 
          t._goToCodeConfirm()
          : 
          t._goToSignUp()
        }
    });
    }

    // 코드 있는지 여부
  _getCode = () => {
    const {userCode} = this.state;
    const t = this;
    axios.post('http://dkstkdvkf00.cafe24.com/CodeLogin.php',{
      userCode:userCode
    })
    .then(function (response) {
        login = response.data.message;

        if(login === "true"){
             t._getClub(userCode);
        }else{
          alert('코드가 잘못되었습니다.')
        }
        
    });
  }

  login = () => {

    this._getCode();


  }

  

}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    paddingBottom:10,
    // backgroundColor: 'red',
  },
  header: {
    width:'100%',
    height:height*0.15,
    // backgroundColor: '#ff9a9a',
  },
  title: {
    paddingHorizontal:10,
    width:'100%',
    
    // backgroundColor: '#9aa9ff'
  },
  content: {
    
    // backgroundColor: '#d6ca1a',
  },
  footer: {
    flex:1,
    position:'absolute',
    alignItems:'center',
    bottom:10,
    width:"100%",
    textAlign:'center',
    //  backgroundColor: '#1ad657',
    paddingTop: 10,
    alignSelf: 'center',
    backgroundColor:'white'
  },
  input: {
    padding: 7,
    borderColor: "#32B8FF",
    borderWidth: 1,
    fontSize: 17,
    marginTop:7
  },
  codeInput: {
      fontSize: 17,
      color:"#32B8FF"
  }
});