import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import CharButtonN from '../components/CharButtonN';
import {Icon} from 'react-native-elements';

class CharGoal extends Component {


    constructor(props){
        super(props);
        this.state = {
          disabled: true,
        }
      }
       
    
    Press = () => {
      this.state.disabled == true ? this.setState({disabled:false}) : this.setState({disabled:true})
    }


    render() {
        return (
            <>
            <View style={styles.inputView}>
                {
                    this.props.chars.map((data,index,chars) => (
                        <View key={index} >
                            {
                                (this.state.disabled == true)?
                            <TouchableOpacity onPress={this.Press} style={styles.button}>
                                <Text style={{color:'#3B3B3B'}}>{data.text}</Text>
                                
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.button} onPress={this.Press}>
                            <Text style={{color:'white'}}>{data.text}</Text>
                            <TouchableOpacity style={{position: 'absolute'}} onPress={this.props.removeChar.bind(this, index)}>
                                    <Icon
                                        reverse
                                        size={10}
                                        name='cross'
                                        type='entypo'
                                        color='#676765'
                                        />
                            </TouchableOpacity>
                            </TouchableOpacity>
                            }
                        </View> 

                    ))
                }
            </View>
            </>
        );
    }
}


const styles = StyleSheet.create({
    whole:{
        flexDirection: 'row'
    },
 button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 15,
    height: 40, 
    backgroundColor: 'white',
    paddingRight: 10,
    paddingLeft:10,
    marginRight:10,
   
    
    flexDirection: 'row',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
      shadowRadius: 1, //IOS
      elevation: 1, // Android
  },
    inputView:{
        width:'100%',
        flexWrap: "wrap",
        flex:1,
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop:20
      },
    
    });

    export default CharGoal;