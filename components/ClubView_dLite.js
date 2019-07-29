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
import { scale, moderateScale, verticalScale } from '../components/Scaling';


const { width, height } = Dimensions.get("window");

export default class ClubView_dLite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clubChar: [],
      disabled: true,
    }
  }

  Press = () => {
    this.state.disabled == true ? this.setState({ disabled: false }) : this.setState({ disabled: true })
  }

  showOverlay() {
    this.setState({ modalVisible: true })
  }

  hideOverlay() {
    this.setState({ modalVisible: false })
  }

  onClose = () => this.setState({ modalVisible: false });

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


  render() {
    let { clubLogo } = this.props;
    return (
      <View style={styles.container}>


        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>

            <View style={styles.logo}>
              <Image
                resizeMode="center"
                style={styles.Image}
                source={require('../images/logo3.png')} />
            </View>

            <View style={styles.club}>
              <Text style={styles.clubTitle}>d:Lite</Text>
              <Text style={styles.clubChar}>#동아 #군필자 우대 #파릇파릇 #여름여행 기획중 #여름여행 기획중 </Text>
            </View>

          </View>
        </View>
        {
          (this.state.disabled == true) ?

            <TouchableOpacity onPress={this.Press}  >
              <Image style={styles.picture} source={require('../images/ssam.jpg')} />
              <View>
              </View>
            </TouchableOpacity>

            :

            <TouchableOpacity onPress={this.Press}  >
              <View style={{ zIndex: 0 }}>
                <Image blurRadius={5} style={styles.picture} source={require('../images/ssam.jpg')} />
              </View>
              <View style={{ position: 'absolute', top: 10, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 20, }}>
                <View style={{ width: width * 0.5, height: height * 0.085, backgroundColor: 'white', borderRadius: 50, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>

                  <View style={styles.logo2}>
                    <Image
                      resizeMode="center"

                      style={styles.Image2}
                      source={require('../images/logo3.png')} />
                  </View>

                  <TouchableOpacity style={{ flex: 1 }}>
                    <View style={{ height: height * 0.1, justifyContent: 'center' }}>
                      <Text style={{ fontSize: width * 0.035, }}>소개</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1 }}>
                    <View style={{ height: height * 0.1, justifyContent: 'center' }}>
                      <Text style={{ fontSize: width * 0.035, }}>기록</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>


        }
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height * 0.35,
    // backgroundColor:'#FAFABE',
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  logo: {
    width: width * 0.16,
    height: width * 0.16,
    overflow: 'hidden',
    shadowColor: 'gray', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 5, //IOS
    elevation: 5, // Android 
    borderRadius: width * 0.16 * 0.5,
    borderWidth: 3,
    borderColor: 'white',
    marginRight: 25,

  },
  logo2: {
    margin: width * 0.05,
    width: width * 0.1,
    height: width * 0.1,
    overflow: 'hidden',
    borderRadius: width * 0.1 * 0.5,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: 'gray', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 5, //IOS
    elevation: 5, // Android 
  },


  Image: {
    width: width * 0.15,
    height: width * 0.15,

    backgroundColor: '#fff',
    borderRadius: width * 0.15 * 0.5,

  },
  Image2: {
    flex: 1,
    width: width * 0.09,
    height: width * 0.09,
    borderRadius: width * 0.09 * 0.5,
    backgroundColor: '#fff',
  },
  ImageR: {
    left: -5,
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  club: {
    flex: 1,
    textAlignVertical: "center",
    flexWrap: "wrap"
    // backgroundColor: '#DCEBFF',
  },
  clubTitle: {
    flex: 1,
    marginTop: 0,
    textAlignVertical: "center",
    fontSize: moderateScale(20),
    fontWeight: '100',

    // backgroundColor: 'red',
  },
  clubChar: {
    flex: 1.5,
    textAlignVertical: "center",
    fontSize: moderateScale(10),
    color: '#BBBBBB',
    paddingBottom:5,
    marginBottom: -5,
    lineHeight: 12,
    // backgroundColor: 'green',
  },
  button: {
    top: -40,
    margin: 30,
    height: 70,
    width: 50,
    zIndex: 999,

  },
  picture: {
    zIndex: 0,
    // alignItems:'flex-start',
    // justifyContent:'flex-start',
    marginTop: 10,
    borderRadius: 13,

    width: width * 0.9,
    height: height * 0.23,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android 
  }
});