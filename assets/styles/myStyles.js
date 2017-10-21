import React from 'react';
import {
    StyleSheet
} from 'react-native';

const myStyles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
  container: {
     flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabScreenContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  button: {
    alignSelf: 'stretch',
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 5,
    height: 40,
    backgroundColor: '#2D2D2D',
    justifyContent: 'center'
  },
  buttonText: {
      color: 'white',
      alignSelf: 'center',
      fontSize: 16
  },
  searchContainer: {
      backgroundColor: '#fff',
      marginBottom: 20,
  },
  searchInput: {
      backgroundColor: '#ccc',
  }
});

export default myStyles;