import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import '@expo/vector-icons'; // 5.2.0
import { BlurView } from 'expo';
import CustomButton from '../components/CustomButton';
import { RkText, RkTextInput, RkTheme } from 'react-native-ui-kitten';

import { firebaseApp } from '../FirebaseConfig';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _name: '',
      _email: '',
      _password: '',
    };
    this._onSignUp = this._onSignUp.bind(this);
  }

  static navigationOptions = {
    header: null,
  };

  writeUserData(userId, name, email) {
    firebaseApp.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture: 'http://www.theatricalrights.com/wp-content/themes/trw/assets/images/default-user.png',
      bio: 'No bio',
      cover:'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=750&q=80'
    });
  }

  _validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    Alert.alert(
      'Invalid Email',
      'You have entered an invalid email address!',
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('Invalid Email')
          },
        },
      ],
      { cancelable: false }
    );
    return (false)
  }

  _onSignUp() {
    const { navigate } = this.props.navigation;
    if (this._completed()) {
      if (this._validateEmail(this.state._email)) {
        firebaseApp
          .auth()
          .createUserWithEmailAndPassword(this.state._email, this.state._password)
          .then(() => {
            let user = firebaseApp.auth().currentUser;
            this.writeUserData(user.uid, this.state._name, this.state._email);
            Alert.alert(
              'Alert Title',
              'Đăng kí thành công với email ' + this.state._email,
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => {
                    navigate('Tab')
                    //console.log('Failed')
                  },
                },
              ],
              { cancelable: false }
            );
            this.setState({
              _email: '',
              _password: '',
            });
          })
          .catch(() => {
            Alert.alert(
              'Alert Title',
              'Đăng kí thất bại: ' + this.state._email,
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
    }
  }

  _completed() {
    if (this.state._email === '' || this.state._password === '' || this.state._name === '') {
      Alert.alert(
        'Empty',
        'Please Fill All Required Field.',
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('Invalid Email')
            },
          },
        ],
        { cancelable: false }
      );
      return false;
    }
    return true;
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?auto=format&fit=crop&w=1500&q=80',
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
                    this.nameInput = input;
                  }}
                  returnKeyType='next'
                  placeholder="Name"
                  value={this.state._name}
                  onChangeText={(_name) => this.setState({ _name })} />
              </View>
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
                <CustomButton text={'Sign Up'} backgroundColor={'#fff'} borderWidth={0} color={'#3b5998'} fontSize={18} width={350} height={50} onPress={this._onSignUp} />
              </View>
            </View>
            <View style={styles.lowerView}>
              <Text style={{ color: '#fff', fontSize: 16, marginTop: 50 }}>
                Already have an account?
            </Text>
              <View style={{ marginTop: 20 }}>
                <CustomButton text={'Log in'} backgroundColor={'transparent'} borderWidth={1} borderColor={'#fff'} color={'#fff'} fontSize={18} width={350} height={50} onPress={() => { navigate('LogIn'); }} />
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
  singupBtn: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    width: 350,
  },
  lowerView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  loginBtn: {
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 20,
    borderColor: '#fff',
    borderWidth: 1,
    width: 346,
    borderRadius: 50,
    backgroundColor: 'transparent',
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