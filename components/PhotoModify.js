import React, { Component } from 'react';
import { StyleSheet, Text, Dimensions, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { scale, moderateScale, verticalScale } from './Scaling';
import AutoHeightImage from 'react-native-auto-height-image';
import { ImagePicker, Constants, Permissions } from 'expo';
import PropTypes from 'prop-types';


export default class PhotoModify extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: '',
		};
	}
	static propTypes = {
		id: PropTypes.string.isRequired,
		deleteImage: PropTypes.func.isRequired,
		image: PropTypes.string.isRequired,
	};
	render() {
		const { id, deleteImage, image } = this.props;
		var {height, width} = Dimensions.get('window');
		return (
			<>
			 <View style={styles.container}>
				 	<View style={styles.body}>
						<TouchableOpacity onPress={this._pickImage}>
							<AutoHeightImage
							width={width-20}
							style={{borderTopLeftRadius:10,borderTopRightRadius:10}}
							source={{ uri : image}}
							/>
						</TouchableOpacity>
					</View>
			<View style={styles.bottom}>
				<TextInput
					style={styles.text}
					placeholder={'간단한 코멘트를 입력해주세요'}
					placeholderTextColor={'#bebebe'}
					multiline={false}
					onChangeText={comment => this._updateComment(comment)}
					value={this.state.comment}
					autoCorrect={false}
				/>
			</View>
                <TouchableOpacity style={styles.delBtn} onPressOut={() => deleteImage(id)} >
                    <View>
                        <Text>❌</Text>
                    </View>
                </TouchableOpacity>

			</View>
			</>
		);
	}

	_updateComment = comment => {
		this.setState({ comment })
		const { id, updateComment } = this.props;
		updateComment(id, comment);
	}

	// 이미지피커
	_pickImage = async () => {
		const permissions = Permissions.CAMERA_ROLL;
		const { status } = await Permissions.askAsync(permissions);
		const { id, updateImage } = this.props;

		if (status === 'granted') {
			let result = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				quality: 0.5,
			});

			if (!result.cancelled) {
				this.setState({ image: result.uri });
				updateImage(id, result.uri);
			}
		}
	};

}

const styles = StyleSheet.create({
	container:{
        flex:1,
        margin:5,
        backgroundColor:'white',
        borderWidth: 1,
        borderColor: '#ddd',
		borderBottomWidth: 0,
		borderRadius:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
    
    },
    top:{
        height:40,
        backgroundColor:'white'
    },
    bottom:{
		height:80,
		borderRadius:10,
        backgroundColor:'white',
        justifyContent:'center'
    },
    text:{
		textAlign: 'center',
		fontSize: 20,
		color: '#bebebe',
    },

    delBtn: {
		position: 'absolute',
		borderColor:'gray',
		borderWidth:0.3,
        backgroundColor: 'white',
        top: -7,
        right: -7,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17
    }
});