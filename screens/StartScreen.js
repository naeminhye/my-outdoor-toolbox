import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator,
  Animated,
  Dimensions,
  StatusBar, } from 'react-native';
import { Facebook, BlurView } from 'expo';
import TabScreen from './TabScreen';
import Loading from '../components/Loading';
import { firebaseApp } from '../FirebaseConfig';
import Backend from '../Backend';
import CustomButton from '../components/CustomButton';
import OnBoarding from '../components/OnBoarding';
import { NavigationActions } from 'react-navigation';

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Welcome'})
  ],
})

export default class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoggedIn: false,
      currentIndex: 0,
    };
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    // if(Backend.getUid()) {
    //   setTimeout(() => {
    //     this.setState({
    //       isLoggedIn: true,
    //       isLoading: false
    //     })
    //   }, 3000);
    // }
    // else {
    //   this.setState({
    //     isLoading: false
    //   });
    // }
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setTimeout(() => {
          this.setState({
            isLoggedIn: true,
            isLoading: false
          })
        }, 3000);
      }
      else {
        this.setState({
          isLoading: false
        });
      }
    });
  }

  onScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / deviceWidth);
    if (this.state.currentIndex !== currentIndex) {
      this.animations.forEach((animation) => {
        animation.reset();
      });
      this.animations.get(currentIndex).play();
      this.setState({ currentIndex });
    }
  }

  scrollTo = (index) => {
    this.scrollView._component.scrollTo({
      x: (deviceWidth * index),
      animated: true,
    });
  }

  render() {
    {/*<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator /></View>*/} 
    const { navigate } = this.props.navigation;
    return (
      this.state.isLoading ? 
          <Loading /> :(
          this.state.isLoggedIn ?
          <TabScreen /> : <OnBoarding onPress={() => {
            //navigate('Welcome')
            this.props.navigation.dispatch(resetAction)
          }
          } />)
    );
  }
}