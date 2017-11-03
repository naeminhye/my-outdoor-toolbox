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
  },
  screenHeader: {
    paddingTop: 60, 
    paddingLeft: 20, 
    paddingRight: 20,
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  addButton: {
    backgroundColor: '#ff5722',
    height: 70,
    width: 70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    // shadowColor: '#000000',
    // shadowOpacity: 0.8,
    // shadowRadius: 3,
    // shadowOffset: {
    //   height: 1,
    //   width: 0,
    // },
  },
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  gridItemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    //padding: 10,
    height: 200,
    //borderColor: '#e74c3c',
    borderWidth: 2,
  },
  gridItemName: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  gridItemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  inputIcon: {
    fontSize: 15,
    color: '#0000003a',
    marginLeft: 4,
  },
  searchIcon: {
    marginLeft: 16,
  }
});

export default myStyles;