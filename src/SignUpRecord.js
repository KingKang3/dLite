import React from 'react';
import {StyleSheet, TouchableOpacity, Platform,Dimensions, View, ActivityIndicator} from 'react-native';
import RecordFalse from '../components/RecordFalse';
import RecordTrue from '../components/RecordTrue';
import { Header, Icon } from 'react-native-elements';
import MasonryList from "react-native-masonry-list";
import * as axios from 'axios';
import HeaderScrollView from 'react-native-header-scroll-view';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');


export default class SignUpRecord extends React.Component {
  static navigationOptions = {
    header: null
}
  constructor(props){
    super(props);
    this.state={
      records:[],
      count : 0,
      isGetting: false,
    };

    this.props.navigation.addListener('didFocus', () => {
      this.setState({isGetting: false})
      this._getDatas()
    });

  }



  // 이미지들 가져오기
  _getDatas = async () => {
      //userNo 가지고 오기
      const { navigation } = this.props;
      const {records} = this.state;
      var userNo = navigation.getParam('userNo', 'NO-ID');
      const t = this;
  
      // 데이터 가져오기
      await axios.post('http://dkstkdvkf00.cafe24.com/GetImages.php',{
          userNo:userNo,
        })
        .then((result) => {
          const  response  = result.data;
          var recordArray = new Array();
          response.forEach(row => {
            recordArray.push({ uri : row.recordPicture});
            t.setState({count: this.state.count + 1})
            });
          t.setState({
            records: recordArray,
          });
        });
      
        this.setState({isGetting: true})
  }


  _RecordRegister = async item => {
    var t = this;
    await axios.post('http://dkstkdvkf00.cafe24.com/GetRecordPicture.php',{
           recordPicture:item,
         })
         .then(function (response) {
          var recordNo = response.data.message.recordNo
            t.props.navigation.navigate('RecordRegister', {
              recordNo: recordNo,
              image: item,
              to: 'm'
            });
          
    })
  }


  
  _btnPress = () => {
    if(this.props.navigation.getParam('from','NO-ID')=='m'){
      this.props.navigation.navigate('Main')
    } else {
      this.props.navigation.navigate('FindClub',{
        schoolName : '울대'
      })
    }
    
  }


  render() {
    const { navigation } = this.props;
    var name = navigation.getParam('recordName', 'NO-ID');
    var userNo = navigation.getParam('userNo', 'NO-ID');
    const {records, isGetting} = this.state;
    return (
      <>
      {
        isGetting ?
        <>
        <TouchableOpacity style={{position: 'absolute', width:width*0.2, height:30, top:20,left:10, zIndex:1}} 
					 				   onPress={() => { this.props.navigation.goBack() }}>
											<Ionicons name="ios-arrow-back" size={28} color="black" />
											</TouchableOpacity>
											
					
        <View style={styles.container}>
        <HeaderScrollView 
						fadeDirection="up"
						title="기록 추가">
            <Icon
              raised
              reverse
              name='plus'
              type='entypo'
              color='#2eaeff'
              containerStyle={{ position: 'absolute', bottom:200, right: 10, zIndex:999 }}
              onPress={() => this.props.navigation.navigate('RecordRegister',{
                userNo: userNo
            })}
            />

                        {/* 사진들 들어갈 곳 */}
          <MasonryList
            imageContainerStyle={{borderRadius:17, right:12}}
            spacing={7}
            images={records}
            onPressImage = {(item, index) => {
              this._RecordRegister(item.uri)
          }}
          />
</HeaderScrollView>
            {/* 완료버튼 */}
            <View style={styles.footer}>

            {
              this.state.count >= 1 ?
              <RecordTrue 
              onPress={
                () => this._btnPress()
              }
            />
              
              :
              <RecordFalse />
            }
                {/* true면 <RecordTrue /> false면 <RecordFalse /> */}
               
            </View>
            
        </View>
      
        </>
        :

        <ActivityIndicator size="large" style={styles.activityIndicator}/>
      }
      
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  header:{
      width:'100%',
      height:70,
      // backgroundColor:'#A0AFFF',
      flexDirection:"row",
      justifyContent: "flex-end"
  },
  content:{
    flex: 1
  },
  footer:{
    width: '100%',
    height: 70,
    // backgroundColor: '#5CEEE6',
    borderTopWidth:0
  },
  button:{
      backgroundColor: '#0064FF',
      width:50,
      height:50,
      marginTop:10,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 20,
      borderRadius: 50
  },
  text:{
      fontSize: 25,
      color: '#fff'
  }
});