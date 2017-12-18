import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  ListView,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { firebaseApp } from '../FirebaseConfig';
import {RkText, RkTextInput, RkTheme} from 'react-native-ui-kitten';
import myStyles from '../assets/styles/myStyles';
import { Constants } from 'expo';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import MessageListItem from '../components/MessageListItem';

const SCREEN_LABEL = 'Message';
const STICKY_HEADER_HEIGHT = 40;
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class MessageScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      _focus: false,
      inputValue: '',
      conversations: [],
      userCons: [],
      dataSource: ds.cloneWithRows([]),
    };

    this.database = firebaseApp.database();

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

  renderChatList() {
    return (
      <View>
        <ListView
          style={{ padding: 10 }}
          dataSource={this.state.dataSource}
          renderRow={rowData => (
            <TouchableOpacity onPress={() => 
              navigate('MessageDetail', { id: rowData.id })
            }>
              <MessageListItem
                name={rowData.name}
                //text={rowData.text}
                //image={rowData.image}
              />
            </TouchableOpacity>
          )}
          renderSeparator={(
            sectionID,
            rowID,
            adjacentRowHighlighted
          ) => (
            <View
              key={rowID}
              style={{ height: 1, backgroundColor: 'lightgray' }}
            />
          )}
        />
      </View>
    );
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user != null) {
        var conversationRef = firebaseApp.database().ref('users/' + user.uid + '/conversations/');
        
        if(conversationRef) {
          var userCons = [];
          conversationRef.on('value', snap => {
          snap.forEach(child => {
            userCons.push({
              conversation_id: child.val()._id,
            });
          });

          this.database.ref('conversations').on('value', snap => {
            var events = [];
            var data = [];
            var lastIndex = 0;
            var lastMsg = [];
            snap.forEach(child => {
              lastMsg = child.val().messages;
              lastIndex = lastMsg.length - 1;
              events.push({
                name: child.val().name,
                _key: child.key,
                last_text: lastMsg[lastIndex].text,
                last_time: lastMsg[lastIndex].createdAt,
              });
            });
      
            events.map((item, index) => {
              userCons.map((cons, i) => {
                if (item._key == cons.conversation_id) {
                  data.push({
                    conversation_id: item._key,
                    name: item.name,
                    last_text: item.last_text,
                    last_time: item.last_time,
                  });
                }
              });
            });
      
            this.setState({
              //conversations: events,
              dataSource: ds.cloneWithRows(data),
            });
            console.log(this.state.dataSource);
          });
          });
        }
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
    const { navigate } = this.props.navigation;
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
          </View>
      )}>
          { this.state.dataSource.getRowCount() > 0 ? 
            <View>
              <ListView
                style={{ padding: 10 }}
                dataSource={this.state.dataSource}
                renderRow={rowData => (
                  <TouchableOpacity onPress={() => 
                    navigate('MessageDetail', { conversation_id: rowData.conversation_id })
                  }>
                    <MessageListItem
                      name={rowData.name}
                      text={rowData.last_text}
                      //image={rowData.image}
                      time={rowData.last_time}
                    />
                  </TouchableOpacity>
                )}/>
            </View>
          : <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{ fontSize: 24, fontWeight: '600', color: '#CCCCCC' }}>
                No conversation
              </Text>
            </View>}
        

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