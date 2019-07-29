import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View, Image, TouchableOpacity } from 'react-native';
import { scale, moderateScale, verticalScale } from './Scaling';
import { ImagePicker, Constants, Permissions } from 'expo';
import AutoHeightImage from 'react-native-auto-height-image';

const { width, height } = Dimensions.get("window");

export default class ClubChars extends React.Component {
	constructor(props) {
		super(props);
    }
	render() {
		return (
			<View style={styles.container}>
			
				<View style={styles.body}>
					<TouchableOpacity onPress={this._pickImage}>
					<AutoHeightImage
							width={width-20}
							style={{borderTopLeftRadius:10, borderTopRightRadius:10,}}
							source={require('../images/addPhoto5.png')}
							/>
					</TouchableOpacity>
					
				</View>

				<View style={styles.bottom}>
				<Text style={styles.text}>간단한 코멘트를 입력해주세요</Text>
				</View>
				
			</View>
		);
    }


	// 이미지피커
	_pickImage = async () => {
		const permissions = Permissions.CAMERA_ROLL;
		const { status } = await Permissions.askAsync(permissions);

		if (status === 'granted') {
			let result = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				quality: 0.5,
			});

			if (!result.cancelled) {
                this.props.addImage(result.uri);
			}
        }
	};
}

const styles = StyleSheet.create({
	container:{
        flex:1,
		margin:5,
		
        backgroundColor:'white',
		borderRadius:10,
		
        shadowColor: '#AEADAD',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 2,
        shadowRadius: 3,
        elevation: 2,
    
    },
    top:{
        height:40,
        backgroundColor:'white'
	},
	
    bottom:{
        height:80,
        backgroundColor:'white',
		justifyContent:'center',
		borderRadius:10,
	},
    text:{
		textAlign: 'center',
		fontSize: 20,
		color: '#bebebe',
    },
});