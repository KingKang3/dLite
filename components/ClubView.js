import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions
} from 'react-native';
import * as axios from 'axios';
import ClubChars from './ClubChars';
import Overlay from 'react-native-modal-overlay';
import { scale, moderateScale, verticalScale} from '../components/Scaling';

const  {width, height} = Dimensions.get("window");

export default class ClubView extends Component{
  state = {modalVisible: false}

  constructor(props){
    super(props);
    this.state={
      clubChar: [],
    }
  }

  showOverlay() {
    this.setState({modalVisible: true})
  }

  hideOverlay() {
    this.setState({modalVisible: false})
  }

  onClose = () => this.setState({ modalVisible: false});


componentWillMount = () => {
  this._getDatas();
};


_getDatas = () => {
  const { clubName, school } = this.props;
  const { clubChar } = this.state;


// 데이터 가져오기
axios.post('http://dkstkdvkf00.cafe24.com/GetClubChars.php',{
  clubName: clubName,
  school: school,
})
.then((result) => {
  const response  = result.data;
  var clubCharArray = new Array();
  
  response.forEach(row => {
    clubCharArray.push(row.chars);
    });
  
  this.setState({
    clubChar: clubChar.concat(clubCharArray),
  });
    
  
    
});

}
  

_gotoClubIntroduce = () => {
  this.onClose()
  this.props.navigation.navigate('ClubIntroduce', {
    clubName: this.props.clubName,
    school: this.props.school,
    clubLogo: this.props.clubLogo,
    clubMainPicture: this.props.clubMainPicture
  })
}

_gotoRecord = () => {
  this.onClose()
  this.props.navigation.navigate('Record', {
    clubName: this.props.clubName,
    school: this.props.school
  })
}



  render(){
    let {clubLogo, clubName, clubMainPicture} = this.props;
    let {clubChar} = this.state;
    return (
        <View style={styles.container}>

          <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
           <View style={{flexDirection:'row'}}>


            <TouchableOpacity
              onPress={this.showOverlay.bind(this)}>
              <View style={styles.logo}>
                <Image
                  style={styles.Image}
                  source={{ uri: clubLogo }}/>
              </View>
            </TouchableOpacity>

            
              <TouchableOpacity 
                onPress={this.showOverlay.bind(this)}
                style={styles.club} >
                  <Text style={styles.clubTitle}>{clubName}</Text>
                  <Text style={styles.clubChar}>
                    {clubChar.map((chars, i) => {
                          return (<ClubChars 
                                    chars={clubChar[i]}
                                    key={i}/>);
                      })}
                  </Text>
              </TouchableOpacity>
            
           </View>
          </View>

              <View style={styles.picture} >
                <Image style={{flex:1, borderRadius:13}} source={{uri: clubMainPicture}}/>

              </View>
            <Overlay visible={this.state.modalVisible} onClose={this.onClose} 
                      closeOnTouchOutside animationType="zoomIn" animationDuration={200}
                      childrenWrapperStyle={{width:'100%', backgroundColor: 'white', borderRadius: 15,}} 
                      containerStyle={{backgroundColor: 'rgba(50, 50, 50, 0.78)'}} >
              <View style={{flexDriection:'column', }}>
                  <View style={{flexDirection:'row',}}>
                    <View style={styles.logo}>
                    {
                          clubLogo === null ?
                          <Image source={require('../images/momo.jpg')} style={styles.Image} />
                          :
                          {clubLogo} &&
                            <Image source={{uri: clubLogo}} style={styles.Image} />
                        }
                    </View>
                    <View style={{marginBottom:30, flex:1}}>
                        <Text style={styles.clubTitle}>{clubName}</Text>
                        <Text style={styles.clubChar}>
                          {clubChar.map((chars, i) => {
                          return (<ClubChars 
                                    chars={clubChar[i]}
                                    key={i}/>);
                          })}
                        </Text>
                    </View>
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                      <TouchableOpacity 
                        style={styles.button}
                        onPress={this._gotoClubIntroduce}
                      >
                          <Image
                            style={styles.ImageR}
                            source={require('../images/introduce.png')}/>
                            <Text style={{textAlign:'center',fontSize:15}}>소개</Text>
                       
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.button}
                        onPress={this._gotoRecord}
                      >
                          <Image
                            style={styles.ImageR}
                            source={require('../images/record.png')}/>
                            <Text style={{textAlign:'center', fontSize:15}}>기록</Text>
                      </TouchableOpacity>
                  </View>
              </View>
            </Overlay>



        </View>

    )
  }
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:height*0.35,
    // backgroundColor:'#FAFABE',
    flexDirection:"column",
    justifyContent: "flex-start",
    paddingHorizontal:width*0.05,
    alignItems:'center',
    marginBottom:height*0.02,
  },
  logo:{
    width:width*0.15,
    height:width*0.15,
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
      shadowRadius: 1, //IOS
      elevation: 5, // Android 
    borderRadius:100,
    marginRight:25
  },
  
  Image:{
    width:width*0.15,
    height:width*0.15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius:100,
  },
  ImageR:{
    left:-5,
    height:60,
    width:60,
    resizeMode:'contain',
  },
  club:{
    flex:1,
    textAlignVertical: "center",
    flexWrap: "wrap",
      // backgroundColor: '#DCEBFF',
  },
  clubTitle:{
    flex:1,
    marginTop:-5,
    textAlignVertical: "center",
    fontSize: moderateScale(20),
      fontWeight: '100',
  },
  clubChar:{
    flex:1.5,
    textAlignVertical: "center",
    fontSize: moderateScale(10),
      color: '#BBBBBB',
      marginBottom:-5,
      lineHeight:15,
  },
  button:{
    top:-40,
    margin:30,
    height:70,
    width:50,
    zIndex:999,
    // backgroundColor:'red'
  },
  picture:{
    flex:2,
    // alignItems:'flex-start',
    // justifyContent:'flex-start',
    marginTop:10,
    borderRadius:13,
    backgroundColor:'white',
    width:width*0.9,
    height:height*0.23,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
      shadowRadius: 1, //IOS
      elevation: 4, // Android 
  }
});