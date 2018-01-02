import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import '@expo/vector-icons';
//import { StackNavigator } from 'react-navigation';
import { BlurView } from 'expo';
import CustomButton from '../components/CustomButton';
import { RkText, RkTextInput, RkTheme } from 'react-native-ui-kitten';
import { NavigationActions } from 'react-navigation';

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Tab'})
  ],
})

import { firebaseApp } from '../FirebaseConfig';

export default class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _email: '',
      _password: '',
    };
    this._onLogIn = this._onLogIn.bind(this);
  }

  static navigationOptions = {
    header: null,
  };

  _onLogIn() {
    const { navigate } = this.props.navigation;
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(this.state._email, this.state._password)
      .then(() => {
        this.props.navigation.dispatch(resetAction)
        //navigate('Tab');
        // Alert.alert(
        //   'Alert Title',
        //   'Đăng nhập thành công với email ' + this.state._email,
        //   [
        //     {
        //       text: 'Cancel',
        //       onPress: () => console.log('Cancel Pressed'),
        //       style: 'cancel',
        //     },
        //     {
        //       text: 'OK',
        //       onPress: () => {
        //         navigate('Tab')
        //         //console.log('Failed')
        //       },
        //     },
        //   ],
        //   { cancelable: false }
        // );
        this.setState({
          _email: '',
          _password: '',
        });
      })
      .catch(() => {
        Alert.alert(
          'Alert Title',
          'Đăng nhập thất bại: ' + this.state._email,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('Email: ' + this.state._email) },
          ],
          { cancelable: false }
        );
      });
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1503088414719-16a89b27b122?auto=format&fit=crop&w=1400&q=80',
          }}
          style={styles.imageBg}>
          <BlurView tint="dark" intensity={20} style={StyleSheet.absoluteFill}>
            <View style={styles.upperView}>
              <View style={{ height: 70 }}>
                <RkTextInput rkType='forminput'
                  style={{
                    paddingRight: 10,
                    paddingLeft: 10,
                    flex: 1,
                  }}
                  clearButtonMode='always'
                  ref={input => {
                    this.emailInput = input;
                  }}
                  returnKeyType='next'
                  placeholder="Email"
                  value={this.state._email}
                  onChangeText={(_email) => this.setState({ _email })} />
              </View>
              <View style={{ height: 70 }}>
                <RkTextInput rkType='forminput'
                  style={{
                    paddingRight: 10,
                    paddingLeft: 10,
                    flex: 1,
                  }}
                  secureTextEntry={true}
                  clearButtonMode='always'
                  ref={input => {
                    this.passwordInput = input;
                  }}
                  returnKeyType='next'
                  placeholder="Password"
                  value={this.state._password}
                  onChangeText={(_password) => this.setState({ _password })} />
              </View>
              <View style={{ marginTop: 20 }}>
                <CustomButton text={'Log In'} backgroundColor={'#fff'} borderWidth={0} color={'#3b5998'} fontSize={18} width={350} height={50} onPress={this._onLogIn} />
              </View>
            </View>
            <View style={styles.lowerView}>
              <Text style={{ color: '#fff', fontSize: 16, marginTop: 50 }}>
                Do not have an account?
                </Text>
              <View style={{ marginTop: 20 }}>
                <CustomButton text={'Sign Up'} backgroundColor={'transparent'} borderWidth={1} borderColor={'#fff'} color={'#fff'} fontSize={18} width={350} height={50} onPress={() => { goBack(); }} />
              </View>
            </View>
          </BlurView>
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
    // paddingTop: Constants.statusBarHeight,
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
  upperView: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loginBtn: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 100,
    borderRadius: 50,
    width: 350,
  },
  lowerView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  singupBtn: {
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 20,
    borderColor: '#fff',
    borderWidth: 1,
    width: 346,
    borderRadius: 50,
  },
  textInput: {
    height: 40,
    borderColor: 'white',
    borderBottomWidth: 2,
    marginTop: 15,
    width: 300,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});

RkTheme.setType('RkTextInput', 'forminput', {
  height: 50,
  width: 350,
  borderRadius: 50,
  borderWidth: 1,
  borderColor: '#fff',
  underlineWidth: 1,
  underlineColor: '#fff',
  backgroundColor: '#0000',
  placeholderTextColor: '#fff',
  color: '#fff'
}); 