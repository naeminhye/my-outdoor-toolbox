import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  Image,
  ScrollView,
  ListView,
  Dimensions,
  StyleSheet,
  FlatList,
  ListItem,
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { firebaseApp } from '../FirebaseConfig';
import {RkText, RkTextInput, RkTheme} from 'react-native-ui-kitten';
import myStyles from '../assets/styles/myStyles';
import { Constants } from 'expo';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const SCREEN_LABEL = 'Message';
const STICKY_HEADER_HEIGHT = 110;

export default class MessageScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      _focus: false,
      inputValue: '',
      conversations: null,
    };

    this._handleTextChange = this._handleTextChange.bind(this);
    this._handleSubmitText = this._handleSubmitText.bind(this);
    this.renderSearchBox = this.renderSearchBox.bind(this);
  }
  
  _keyExtractor = (item, index) => item.id;

  static navigationOptions = {
    header: null,
    tabBarLabel: SCREEN_LABEL,
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-quote' : 'ios-quote-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  }

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  _handleSubmitText = () => {
    console.log(this.state.inputValue);
  };

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user != null) {
        var userRef = firebaseApp.database().ref('users/' + user.uid);
        userRef.on('value', snap => {
          if(snap.val().conversations != null) {
            this.setState({
              conversations: snap.val().conversations,
            });
          }
        });
      } else {
        console.log('user bị null');
      }
    });
  }

  renderSearchBox() { 
    console.log('render search box');
    return (
      <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
        <RkTextInput rkType='searchbox' label={<Ionicons style={[styles.inputIcon, styles.searchIcon]} name='ios-search'/>}
          style={{paddingRight: 10, flex: 1, }} clearButtonMode='always'
          onFocus={() => {
            this.setState({
              _focus: true,
            });
          }}
          ref={input => {
            this.textInput = input;
          }}
          returnKeyType="search"
          onSubmitEditing={this._handleSubmitText}
          placeholder="Search conversation"
          value={this.state.inputValue}
          onChangeText={this._handleTextChange}
          onBlur={() => {
            this.setState({
              _focus: false,
            });
          }}/>
            {this.state._focus
              ? <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      _focus: false,
                    });
                    this.textInput.blur();
                  }}>
                  <Text style={{ fontSize: 18, color: '#007aff', margin: 10 }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              : null}
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Constants.statusBarHeight, }}>
      <ParallaxScrollView
      ref={(scroll) => { this.scrollview = scroll; }}
      backgroundColor="#fff"
      contentBackgroundColor="#fff"
      parallaxHeaderHeight={170}
      stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
      renderForeground={() => (
        <View>
          <View style={[myStyles.screenHeader]}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, }}>{SCREEN_LABEL}</Text>
            <Text style={{ fontSize: 22, color: '#FF5252', marginBottom: 10, }}>Edit</Text>
          </View>
          <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
            <RkTextInput rkType='searchbox' label={<Ionicons style={[styles.inputIcon, styles.searchIcon]} name='ios-search'/>}
              style={{paddingRight: 10, flex: 1, }} clearButtonMode='always'
              onFocus={() => {
                this.setState({
                  _focus: true,
                });
              }}
              ref={input => {
                this.textInput = input;
              }}
              returnKeyType="search"
              onSubmitEditing={this._handleSubmitText}
              placeholder="Search conversation"
              value={this.state.inputValue}
              onChangeText={this._handleTextChange}
              onBlur={() => {
                this.setState({
                  _focus: false,
                });
              }}/>
                {this.state._focus
                  ? <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          _focus: false,
                        });
                        this.textInput.blur();
                      }}>
                      <Text style={{ fontSize: 18, color: '#007aff', margin: 10 }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  : null}
          </View>
        </View>
      )}
      renderStickyHeader={() => (
        <View key="sticky-header" style={{height: STICKY_HEADER_HEIGHT, alignItems:'center',justifyContent: 'flex-end',paddingTop: Constants.statusBarHeight,}}>
          <Text style={{fontSize: 18, fontWeight: 'bold',margin: 10}}
          onPress={() => this.scrollview.scrollTo({ x: 0, y: 0 })}>{SCREEN_LABEL}</Text>
          <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
            <RkTextInput rkType='searchbox' label={<Ionicons style={[styles.inputIcon, styles.searchIcon]} name='ios-search'/>}
              style={{paddingRight: 10, flex: 1, }} clearButtonMode='always'
              onFocus={() => {
                this.setState({
                  _focus: true,
                });
              }}
              ref={input => {
                this.textInput = input;
              }}
              returnKeyType="search"
              onSubmitEditing={this._handleSubmitText}
              placeholder="Search conversation"
              value={this.state.inputValue}
              onChangeText={this._handleTextChange}
              onBlur={() => {
                this.setState({
                  _focus: false,
                });
              }}/>
                {this.state._focus
                  ? <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          _focus: false,
                        });
                        this.textInput.blur();
                      }}>
                      <Text style={{ fontSize: 18, color: '#007aff', margin: 10 }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  : null}
            </View>
          </View>
      )}>
          { this.state.conversations ? <View><Text>Hello user</Text></View>
          : <View><Text>No conversation</Text></View>}
        

        </ParallaxScrollView>
        <TouchableOpacity onPress={() => {}}>
          <View style={{ backgroundColor: '#FF5252', width: 60, height: 60, borderRadius:30, position: 'absolute', bottom: 30, right: 30, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: -2, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 1,}}>
              <Ionicons name={'md-add'} size={32} color={'#FFF'} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: '#f0efec',
    flex: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
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

RkTheme.setType('RkTextInput','searchbox',{
  height: 40,
  borderRadius: 50,
  underlineColor:'#0000001A',
  backgroundColor: '#0000001A'
}); 