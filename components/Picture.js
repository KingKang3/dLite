import React, {Component} from 'react';
import {StyleSheet, Image, Text, Platform,Dimensions, } from 'react-native';
import Picture from '../components/Picture';
import AutoHeightImage from 'react-native-auto-height-image';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';

import * as axios from 'axios';



export default class Pictures extends React.Component {

  render() {
    var {height, width} = Dimensions.get('window');
    return (
      <>
      <Container style={{padding:10,}}>
       
        <Content>
          <Card>
            <CardItem>
              <Left>
                
                <Body>
                  <Text>  </Text>
                  
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
            <AutoHeightImage
              width={width-80}
              style={{flex:1,}}
              source={{uri : this.props.picture}}
            />
             
            </CardItem>
            <CardItem>
             
              <Body style={{paddingVertical:10}}>
              
                  <Text style={{fontSize:25}}>{this.props.text}</Text>
               
              </Body>
              
            </CardItem>
          </Card>
        </Content>
      </Container>
      </>
    );
  }
}

