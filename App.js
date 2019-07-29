import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; 
import Main from './src/Main';
import codeConfirm from './src/codeConfirm';
import SignUp from './src/SignUp';
import CharChoice from './src/CharChoice';
import SignUpRecord from './src/SignUpRecord';
import RecordRegister from './src/RecordRegister';
import FindClub from './src/FindClub';
import ClubIntroduce from './src/ClubIntroduce';
import RecordPictures from './src/RecordPictures';
import ClubModify from './src/ClubModify';
import Record from './src/Record';
import { zoomIn, zoomOut, fromLeft } from 'react-navigation-transitions'


const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];
 
  if (prevScene
    && prevScene.route.routeName === 'Record'
    && nextScene.route.routeName === 'RecordPictures') {
    return zoomIn();
  } else if (prevScene
    && prevScene.route.routeName === 'RecordPictures'
    && nextScene.route.routeName === 'Record') {
    return zoomOut();
  }
  return fromLeft();
}

const RootStack = createStackNavigator(
  {
    Main: {
      screen: Main,
    },
    codeConfirm: {
      screen: codeConfirm,
    },
    SignUp: {
      screen: SignUp,
    },
    CharChoice: {
      screen: CharChoice,
    },
    SignUpRecord: {
      screen: SignUpRecord,
    },
    RecordRegister: {
      screen: RecordRegister,
    },
    FindClub: {
      screen: FindClub,
    },
    ClubIntroduce: {
      screen: ClubIntroduce,
    },
    RecordPictures: {
      screen: RecordPictures,
    },
    ClubModify: {
      screen: ClubModify,
    },
    Record: {
      screen: Record,
    },
  },
  {
    initialRouteName: 'ClubModify',
    transitionConfig: (nav) => handleCustomTransition(nav)
  },
  
);




const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <>
      <AppContainer />
      <StatusBar
      barStyle = "dark-content"
      // dark-content, light-content and default
      hidden = {false}
      //To hide statusBar
      backgroundColor = "white"
      //Background color of statusBar only works for Android
      translucent = {false}
      //allowing light, but not detailed shapes
      networkActivityIndicatorVisible = {true}
  />
  </>
      )
    }
  }