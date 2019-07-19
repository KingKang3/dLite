import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, AsyncStorage,Dimensions, Text, View, TouchableWithoutFeedback, Keyboard,BackHandler,Platform} from 'react-native';
import ConfirmButton from '../components/ConfirmButton';
import ConfirmButtonN from '../components/ConfirmButtonN';
import CharButton from '../components/CharButton';
import CharInput from '../components/CharInput';
import CharGoal from '../components/CharGoal';
import CharEX from '../components/CharEX';
import * as axios from 'axios';
import { scale, moderateScale, verticalScale} from '../components/Scaling';
import HeaderScrollView from 'react-native-header-scroll-view';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { Ionicons } from '@expo/vector-icons';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const  {width, height} = Dimensions.get("window");

export default class CharChoice extends React.Component {
  static navigationOptions = {
    headerLeft: null,
    gesturesEnabled: false,
    header: null
}

  constructor(props){
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state={
      clubChars:[],
      chars:[],
      count:0,
    };
  }

  componentDidMount = () => {
    AsyncStorage.getItem("chars").then(data => {
      const chars = JSON.parse(data || '[]');
      this.setState({ chars });
    });
  };

  removeChar = (index) => {
    let clubChars = [...this.state.clubChars];
    let chars = [...this.state.chars]
    let {count} = this.state
    chars.splice(index,1)
    clubChars.splice(index,1)
    this.setState({
      chars: chars,
      clubChars: clubChars,
      count: count-1,
    })
  }

  addChar = (char) => {
    let {count} = this.state;
   this.setState({count: count+1})
    // 새로운 특성(char) 객체 생성
    const newChar = {
        id: Date.now(), // 등록시간
        text: char,      // 특성 내용
    }   
    // state 업데이트
    this.setState(prevState => {
      prevState.clubChars.push(char);
      prevState.chars.push(newChar);
      return prevState;
      });
      
  }



  _ButtonPress = () => {
    // console.log(this.state.count);
    const { navigation } = this.props;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    this._setClubChars();
    setTimeout(()=>{
      this.props.navigation.navigate('SignUpRecord', {
        userNo: userNo
      },3000)
    })
    
  }


  _setClubChars = () => {
    const { navigation } = this.props;
    const { clubChars } = this.state;
    var userNo = navigation.getParam('userNo', 'NO-ID');
    for(let i=0; i<clubChars.length; i++){
        // 데이터베이스에 넣기
        axios.post('http://dkstkdvkf00.cafe24.com/SetClubChars.php',{
          chars: clubChars[i],
          userNo: userNo
        })
        .then(function (response) {
            ms = response.data.message;
        });
          }
  }


  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    this.setState({
      text:'',
      chars:[],
    })
  }

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}


  clear = () => {
    this.setState({text:""})
  }
  

  handleBackButtonClick() {
    this.props.navigation.navigate('codeConfirm');
    return true;
}

  render() {
    const { navigate } = this.props.navigation; 
   
    return (
      <>
      <View style={styles.container}>
      <TouchableOpacity style={{position: 'absolute', width:width*0.2, height:30, top:20,left:10, zIndex:1}} 
                        onPress={() => { this.props.navigation.navigate('codeConfirm') }}><Ionicons name="ios-arrow-back" size={28} color="black" /></TouchableOpacity>
      <HeaderScrollView 
      // scrollContainerStyle={{backgroundColor:'red'}}
      scrollEnabled={false}
          fadeDirection="up"
          title="특징 입력">
        {/* 샾버튼 모아놓은거 */}
      <View style={{flex:1}}>
        {this.state.count >= 15 ?
                <View style={styles.dd}></View>
                :
                <CharInput addChar={this.addChar} />
            }
            {/* 위에 샾버튼 클릭했을 때 생긴 샾버튼 들어가는 곳 */}
            </View>
          <View style={styles.contain}>

            {this.state.chars == 0 ?
            <>
            <View style={{flexDirection:'column'}}>
              <Text style={{fontSize:moderateScale(12), color:'#BBBBBB', marginBottom:10}}> 예시){"\n"}</Text>
              <View style={{flexDirection:'row',flexWrap: "wrap", justifyContent:'space-evenly'}}>
                <CharEX title="#소규모"/><CharEX title="#꿀잼"/><CharEX title="#잘생긴놈들"/><CharEX title="#아싸들의 성지"/><CharEX title="#페북/인스타 운영"/>
                <CharEX title="#친근함"/><CharEX title="#대규모"/><CharEX title="#매주 여행"/>
              </View>
            </View>
            </>
            :
            <CharGoal 
            chars={this.state.chars}
            removeChar={this.removeChar}/>
            }
          </View>
          <View style={{height:80}}/>
    
        
              
             
         
          </HeaderScrollView>  
        {/* 완료버튼 */}
          <View style={styles.footer}>
          {(this.state.chars ==0 )?<ConfirmButtonN title={'선택완료'}/>:<ConfirmButton title={'선택완료'}  onPress={this._ButtonPress} /> }
          </View>

          </View>
     
        
        
        
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal:10,
    paddingBottom:10,
    backgroundColor: "white",
  },
  header: {
    width:'100%',
    
    paddingTop:20
    // backgroundColor: '#ff9a9a',
  },
  title: {
    width:'100%',
    paddingTop: scale(10),
    flexDirection: "row",
    alignItems:"flex-end",
    // backgroundColor: '#9aa9ff',
    paddingLeft: 15
  },
  dd: {
    height:'5%'
  },
  content: {
    
    // backgroundColor: '#d6ca1a',
    padding:15,
    paddingTop:30,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom:50
    
  },
  inputView:{
    width:'100%',
    height:110,
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop:30
  },
  footer: {
    flex:1,
    position:'absolute',
    alignItems:'center',
    bottom:10,
    width:"100%",
    textAlign:'center',
    // backgroundColor: '#1ad657',
    paddingTop: 10,
    alignSelf: 'center',
    backgroundColor:'white'
  },
  
  text_1: {
    fontSize: moderateScale(25),
      color:"#0A6EFF",
      marginRight:3
  },
  text_2: {
    fontSize: moderateScale(12),
      color: "#aaaaaa"
  },
  selectView:{
    flexDirection: "row",
    
  },
  STBT:{
   
    paddingLeft: 50,
    marginLeft:50,
  },
  AB:{
    backgroundColor:"red"
  },
  contain:{
    height:'25%',
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end"
  }
});