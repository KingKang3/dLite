import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

class ClubPickerM extends Component {
   state = {user: this.props.clubKind}
   state ={
        icon: <AntDesign name="bars" size={25} color="#0A6EFF" />
   }
   updateUser = (user) => {
      this.setState({ user: user })
      this.props.callbackFromParent(user);
   }

  componentWillMount = () => {
      this.setState({user: this.props.clubKind})
  }


   render() {
    //   alert(this.props.clubKind)
      return (
          
         <View>
                
             
      <Picker
       
      mode="dropdown"
       selectedValue = {this.props.clubKind} onValueChange = {this.updateUser}>
               <Picker.Item label = "예술 공연" value = "예술 공연" />
               <Picker.Item label = "예술 교양" value = "예술 교양" />
               <Picker.Item label = "체육 구기" value = "체육 구기" />
               <Picker.Item label = "체육 생활" value = "체육 생활" />
               <Picker.Item label = "봉사" value = "봉사" />
               <Picker.Item label = "국제" value = "국제" />
               <Picker.Item label = "종교" value = "종교" />
               <Picker.Item label = "학술" value = "학술" />
               <Picker.Item label = "기타" value = "기타" />
            </Picker>
            
         </View>
        
      )
   }
}

export default ClubPickerM
const styles = StyleSheet.create({
    text: {
       fontSize: 30,
       alignSelf: 'center',
       color: 'red'
    }
 })