import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements'; // 0.17.0
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.13

export default class StartScreen extends Component {
    
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://goo.gl/Qiccdn',
          }}
          style={styles.imageBg}>

          <View style={styles.titleView}>
            <Text style={styles.title}>
              Message App
            </Text>
            <Text style={styles.description}>
              Welcome to my Message App!
            </Text>
          </View>
          <View style={styles.loginBtnView}>
            <Button
              large
              iconRight={{
                name: 'angle-right',
                type: 'font-awesome',
                color: '#87cefa',
              }}
              title="Log in with your Account"
              //backgroundColor='#fff' 
              color='#87cefa'
              buttonStyle={[styles.loginBtn, { backgroundColor:'#fff' }]}
              onPress={() => {
                 navigate('LogIn');
               }}
            />
            <Button
              large
              iconRight={{
                name: 'angle-right',
                type: 'font-awesome',
                color: '#fff',
              }}
              title="Log in with Facebook"
              //backgroundColor='#87cefa'
              color='#fff'
              buttonStyle={[styles.loginBtn, { backgroundColor:'#87cefa' }]}
            />
          </View>
          <View style={styles.signupBtnView}>
            <Text style={{ color: '#fff', fontSize: 16 }}>
              {' '}Do not have an account?
            </Text>
            <Button
              large
              iconRight={{
                name: 'angle-right',
                type: 'font-awesome',
                color: '#fff',
              }}
              title="Sign up"
              //backgroundColor='transparent'
              color='#fff'
              buttonStyle={[styles.singupBtn, { backgroundColor:'transparent' }]}
               onPress={() => {
                 navigate('SignUp');
              }}
            />
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    //justifyContent: 'center',
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: 'transparent',
  },
  imageBg: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleView: {
    //flex: 1,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    //margin: 24,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  description: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  },
  loginBtnView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtn: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 40,
    width: 350,
    borderRadius: 50,
  },
  signupBtnView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  singupBtn: {
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 20,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 50,
    width: 346,
  },
});
