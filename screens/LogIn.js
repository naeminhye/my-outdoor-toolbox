import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import { Button, FormInput } from 'react-native-elements'; // 0.17.0
import '@expo/vector-icons'; // 5.2.0
//import { StackNavigator } from 'react-navigation';
//import { Constants } from 'expo';

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
          Alert.alert(
            'Alert Title',
            'Đăng nhập thành công với email ' + this.state._email,
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
        return (
          <View style={styles.container}>
            <Image
              source={{
                uri: 'https://goo.gl/Kgg2vY',
              }}
              style={styles.imageBg}>
              <View style={styles.upperView}>
                <FormInput
                  containerStyle={styles.textInput}
                  placeholder='Email'
                  placeholderTextColor='#fff'
                  inputStyle={styles.text}
                  onChangeText={(_email) => this.setState({ _email })}
                  value={this.state._email}
                />
                <FormInput
                  containerStyle={styles.textInput}
                  placeholder='Password'
                  placeholderTextColor='#fff'
                  secureTextEntry={true}
                  inputStyle={styles.text}
                  onChangeText={(_password) => this.setState({ _password })}
                  value={this.state._password}
                />
                <Button
                  large
                  iconRight={{
                    name: 'angle-right',
                    type: 'font-awesome',
                    color: '#87cefa',
                  }}
                  title='Log In'
                  color='#87cefa'
                  buttonStyle={[styles.loginBtn, { backgroundColor: '#fff' }]}
                  onPress={this._onLogIn}
                />
              </View>
              <View style={styles.lowerView}>
    
                <Text style={{ color: '#fff', fontSize: 16, marginTop: 50 }}>
                  Do not have an account?
                </Text>
                <Button
                  large
                  iconRight={{
                    name: 'angle-right',
                    type: 'font-awesome',
                    color: '#fff',
                  }}
                  title='Sign Up'
                  color='#fff'
                  buttonStyle={[styles.singupBtn, { backgroundColor: 'transparent' }]}
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
