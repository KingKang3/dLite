import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions
} from 'react-native';
import Overlay from 'react-native-modal-overlay';
import { scale, moderateScale, verticalScale} from '../components/Scaling';


const  {width, height} = Dimensions.get("window");

export default class ClubView_dLite extends Component{

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

  _gotoClubIntroduce = () => {
    this.onClose()
    this.props.navigation.navigate('ClubIntroduce_dLite', {
      clubName: this.props.clubName,
      school: this.props.school
    })
  }
  
  _gotoRecord = () => {
    this.onClose()
    this.props.navigation.navigate('Record_dLite', {
      clubName: this.props.clubName,
      school: this.props.school
    })
  }


  render(){
    let {clubLogo} = this.props;
    return (
        <View style={styles.container}>

      
        <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
          <View style={{flexDirection:'row'}}>

            <View style={styles.logo}>
              <Image
              resizeMode="center"
              borderRadius={30}
                style={styles.Image}
                source={require('../images/logo3.png')}/>
            </View>
            
            <View style={styles.club}>
                <Text style={styles.clubTitle}>d:Lite</Text>
                <Text style={styles.clubChar}>#동아 #군필자 우대 #파릇파릇 #여름여행 기획중</Text>
            </View>
        
          </View>
        </View>
          
    <View style={styles.picture} >


    </View>
            

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
      flexWrap: "wrap"
      // backgroundColor: '#DCEBFF',
  },
  clubTitle:{
    flex:1,
    marginTop:-7,
    textAlignVertical: "center",
    fontSize: moderateScale(20),
      fontWeight: '100',
      
      // backgroundColor: 'red',
  },
  clubChar:{
    flex:1.5,
    textAlignVertical: "center",
    fontSize: moderateScale(10),
      color: '#BBBBBB',
      marginBottom:-5,
      lineHeight:15,
      // backgroundColor: 'green',
  },
  button:{
    top:-40,
    margin:30,
    height:70,
    width:50,
    zIndex:999,
    
  },
  picture:{
    flex:2,
    // alignItems:'flex-start',
    // justifyContent:'flex-start',
    marginTop:10,
    borderRadius:13,
    backgroundColor: '#DCEBFF', 
    width:width*0.9,
    height:height*0.23,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
      shadowRadius: 1, //IOS
      elevation: 2, // Android 
  }
});