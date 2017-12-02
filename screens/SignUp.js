import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import { Button, FormInput } from 'react-native-elements'; // 0.17.0
import '@expo/vector-icons'; // 5.2.0
//import { Constants } from 'expo';
//import TextField from './TextField';

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
      profile_picture : 'http://www.theatricalrights.com/wp-content/themes/trw/assets/images/default-user.png'
    });
  }

  _onSignUp() {
    const { navigate } = this.props.navigation;
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

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://goo.gl/bu3e9g',
          }}
          style={styles.imageBg}>

          <View style={styles.upperView}>
            <FormInput
              containerStyle={styles.textInput}
              placeholder="Name"
              placeholderTextColor="#fff"
              inputStyle={styles.text}
              onChangeText={(_name) => this.setState({ _name })}
              value={this.state._name}
            />
            <FormInput
              containerStyle={styles.textInput}
              placeholder="Password"
              placeholderTextColor="#fff"
              secureTextEntry={true}
              inputStyle={styles.text}
              onChangeText={(_password) => this.setState({ _password })}
              value={this.state._password}
            />
            <FormInput
              containerStyle={styles.textInput}
              placeholder="Email"
              placeholderTextColor="#fff"
              inputStyle={styles.text}
              onChangeText={(_email) => this.setState({ _email })}
              value={this.state._email}
            />
            <Button
              large
              iconRight={{
                name: 'angle-right',
                type: 'font-awesome',
                color: '#87cefa',
              }}
              title="Sign Up"
              color="#87cefa"
              buttonStyle={styles.singupBtn}
              onPress={this._onSignUp}
              // buttonStyle={[styles.singupBtn, { backgroundColor: '#fff' }]}
            />
          </View>
          <View style={styles.lowerView}>
            <Text style={{ color: '#fff', fontSize: 16, marginTop: 50 }}>
              Already have an account?
            </Text>
            <Button
              large
              iconRight={{
                name: 'angle-right',
                type: 'font-awesome',
                color: '#fff',
              }}
              title="Log in"
              color="#fff"
              buttonStyle={styles.loginBtn}
              // buttonStyle={[styles.loginBtn, { backgroundColor: 'transparent' }]}
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
