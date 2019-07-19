import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import ClubView from './ClubView';
import * as axios from 'axios';
import PropTypes from "prop-types";

export default class ClubDiv extends Component{
  constructor(props){
    super(props);
    this.state={
      clubName:[],
      clubLogo:[],
      clubMainPicture:[],
    };
  }
  static propTypes = {
    school: PropTypes.string.isRequired,
  };
  


componentWillMount = async () => {
  await this._getDatas();
};


_getDatas = async () => {
const { clubName, clubLogo, clubMainPicture } = this.state;
const { school, clubKind } = this.props;
this.setState({school : school})



// 데이터 가져오기
await axios.post('http://dkstkdvkf00.cafe24.com/FindClubs.php',{
    school:school,
    clubKind: clubKind,
  })
  .then((result) => {
    const  response  = result.data;
    var clubNameArray = new Array();
    var clubLogoArray = new Array();
    var clubMainPictureArray = new Array();
    
    response.forEach(row => {
      clubNameArray.push(row.clubName);
      clubLogoArray.push(row.clubLogo);
      clubMainPictureArray.push(row.clubMainPicture);
      });
    
    this.setState({
      clubName: clubName.concat(clubNameArray),
      clubLogo: clubLogo.concat(clubLogoArray),
      clubMainPicture: clubMainPicture.concat(clubMainPictureArray),
    });
  });
}


_gotoClubIntroduce = () => {
}


  render(){
    const {clubName, clubLogo, clubMainPicture} = this.state;
    const { school, clubKind } = this.props;
    // console.log(count);



    return (
        <View style={styles.container}>

            <Text style={styles.menuTitle}>{clubKind}</Text>
              {clubName.map((name, i) => {
                        return (
                                  
                                  <ClubView clubName={clubName[i]}
                                            clubLogo={clubLogo[i]}
                                            clubMainPicture={clubMainPicture[i]}
                                            school={school}
                                            key={i}
                                            navigation={this.props.navigation}
                                  />
                                  
                                 );
                    })}
            
        </View>

    )
  }
}

const styles = StyleSheet.create({
    container:{
      width:'100%',
      borderTopWidth:1,
      borderColor: '#ededed',
      marginBottom: 10
    },
    menuTitle:{
        marginBottom: 7,
        paddingTop:15,
        paddingLeft:25,
        color: '#828282',
        fontSize: 15
    },
    
    });