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
import SlidingUpPanel from 'rn-sliding-up-panel';
import AddNewPost from '../components/AddNewPost';
import _ from 'lodash';

const SCREEN_LABEL = 'Message';
const STICKY_HEADER_HEIGHT = 40;
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
var { width, height } = Dimensions.get('window');

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
      panelVisible: false,
    };

    this.database = firebaseApp.database();

    //this._handleTextChange = this._handleTextChange.bind(this);
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

  // _handleTextChange = inputValue => {
  //   this.setState({ inputValue });
  // };

  _handleSubmitText = () => {
    console.log(this.state.inputValue);
  };

  _filter(text) {
    let pattern = new RegExp(text, 'i');
    let chats = _.filter(this.chatlist, (chat) => {
      if (chat.name.search(pattern) != -1)
        return chat;
    });
    this.setState({
      //conversations: events,
      dataSource: ds.cloneWithRows(chats),
    });
  }

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
            var numOfMembers = 2;
            var members = [];
            var nameOfConversation = '';
            var image = 'https://78.media.tumblr.com/865f4207e818841b80726e56c5c1689b/tumblr_op7fvw7TPE1vfhewmo1_250.png';
            snap.forEach(child => {
              lastMsg = child.val().messages;
              lastIndex = lastMsg.length - 1;
              numOfMembers = child.val().member.length;
              members = child.val().member;
              if (numOfMembers ===2 ) {
                members.forEach(mem => {
                  if(mem.uid != user.uid) {
                    nameOfConversation = mem.username;
                    image = mem.profile_photo_url;
                  }
                });
              }
              else {
                nameOfConversation = child.val().name;
              }
              events.push({
                name: nameOfConversation,
                _key: child.key,
                last_text: lastMsg[lastIndex].text,
                last_time: lastMsg[lastIndex].createdAt,
                image: image
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
                    image: item.image
                  });
                }
              });
            });
      
            this.chatlist = data;
            this.setState({
              //conversations: events,
              dataSource: ds.cloneWithRows(this.chatlist),
            });
            //console.log(this.state.dataSource);
          });
          });
        }
      } else {
        console.log('user bị null');
      }
    });
  }

  renderSearchBox() { 
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
          // value={this.state.inputValue}
          // onChangeText={this._handleTextChange}
          onChange={(event) => this._filter(event.nativeEvent.text)}
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
              // value={this.state.inputValue}
              // onChangeText={this._handleTextChange}
              onChange={(event) => this._filter(event.nativeEvent.text)}
              onBlur={() => {
                this.setState({
                  _focus: false,
                });
              }}/>
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
                      image={rowData.image}
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
        <TouchableOpacity onPress={() => this.setState({panelVisible: !this.state.panelVisible})}>
          <View style={{ backgroundColor: '#FF5252', width: 60, height: 60, borderRadius:30, position: 'absolute', bottom: 30, right: 30, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: -2, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 1,}}>
              <Ionicons name={'md-add'} size={32} color={'#FFF'} />
          </View>
        </TouchableOpacity>
        <SlidingUpPanel
          allowDragging={false}
          ref={c => this._panel = c}
          visible={this.state.panelVisible}
          onRequestClose={() => this.setState({panelVisible: false})}>
          <View style={{
            flex: 1,
            backgroundColor: '#fff',
            //justifyContent: 'center', alignItems: 'center' 
          }}>
          {/*<AddNewPost onCancelPress={() => this.setState({panelVisible: !this.state.panelVisible})}/>*/}
          <TouchableOpacity onPress={() => this.setState({panelVisible: !this.state.panelVisible})}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          </View>
        </SlidingUpPanel>
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