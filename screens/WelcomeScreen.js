import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Facebook, BlurView } from 'expo';
import { firebaseApp } from '../FirebaseConfig';
import Backend from '../Backend';
import CustomButton from '../components/CustomButton';

export default class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props);
      }
      static navigationOptions = {
        header: null,
      };
    
      _handleFacebookLogin = async () => {
        try {
          const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            '1201211719949057', // Replace with your own app id in standalone app
            { permissions: ['public_profile'] }
          );
    
          switch (type) {
            case 'success': {
              // Get the user's name using Facebook's Graph API
              const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
              const profile = await response.json();
              Alert.alert(
                'Logged in!',
                `Hi ${profile.name}!`,
              );
              break;
            }
            case 'cancel': {
              Alert.alert(
                'Cancelled!',
                'Login was cancelled!',
              );
              break;
            }
            default: {
              Alert.alert(
                'Oops!',
                'Login failed!',
              );
            }
          }
        } catch (e) {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      };
    render() {
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1478860002487-680cc42afbeb?auto=format&fit=crop&w=1534&q=80',
              }}
              style={styles.imageBg}>
              <BlurView tint="dark" intensity={20} style={StyleSheet.absoluteFill}>
              <View style={styles.titleView}>
                <Text style={styles.title}>
                  OUTify
                </Text>
                <Text style={styles.description}>
                  Welcome to My Outdoor Toolbox!
                </Text>
              </View>
              <View style={styles.loginBtnView}>
                <CustomButton text={'Log in with your Account'} backgroundColor={'#fff'} borderWidth={0} color={'#3b5998'} fontSize={18} width={350} height={50} onPress={()=>{navigate('LogIn');}}/>
                <CustomButton text={'Log in with Facebook'} backgroundColor={'#3b5998'} borderWidth={0} color={'#fff'} fontSize={18} width={350} height={50} onPress={()=>{navigate('LogIn');}}/>
              </View>
              <View style={styles.signupBtnView}>
                <Text style={{ color: '#fff', fontSize: 16 }}>
                  {' '}Do not have an account?
                </Text>
                <View style={{ marginTop: 20 }}>
                  <CustomButton text={'Sign up'} backgroundColor={'transparent'} borderWidth={1} borderColor={'#fff'} color={'#fff'} fontSize={18} width={350} height={50} onPress={()=>{navigate('SignUp');}}/>
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
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 40
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
  