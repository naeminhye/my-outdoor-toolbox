import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button, FormInput } from 'react-native-elements'; // 0.17.0
import '@expo/vector-icons'; // 5.2.0
//import { Constants } from 'expo';

export default class LogIn extends Component {
  
    static navigationOptions = {
      header: null,
    };

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
                  placeholder='Username'
                  placeholderTextColor='#fff'
                  inputStyle={styles.text}
                />
                <FormInput
                  containerStyle={styles.textInput}
                  placeholder='Password'
                  placeholderTextColor='#fff'
                  inputStyle={styles.text}
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