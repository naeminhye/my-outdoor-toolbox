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

import {GiftedChat, Actions, Bubble, SystemMessage, GiftedAvatar} from 'react-native-gifted-chat';
import { firebaseApp } from '../FirebaseConfig';
import myStyles from '../assets/styles/myStyles';
import { Constants } from 'expo';

export default class MessageDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nameOfConversation: 'Conversation',
            nameOfUser: '',
            messages: [],
            currentUser: '',
            loadEarlier: true,
            typingText: null,
            isLoadingEarlier: false,
        }
        
        this.database = firebaseApp.database();
    }
    messagesRef = null;

    static navigationOptions = {
      header: null,
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;

        firebaseApp.auth().onAuthStateChanged(user => {
          if (user != null) {
            this.setState({
                currentUser: user.uid
            });

            this.database.ref('conversations/' + params.conversation_id).on('value', snap => {
                this.setState({
                    nameOfConversation: snap.val().name,
                    //messages: snap.val().messages
                });
            });
            
            this.loadMessages((message) => {
                this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, message),
                };
                });
            });
          } else {
            console.log('user bị null');
          }
        });
        
      }

      loadMessages(callback) {
        const { params } = this.props.navigation.state;
        this.messagesRef = this.database.ref('conversations/' + params.conversation_id + '/messages');
        this.messagesRef.off();
        const onReceive = (data) => {
          //const message = data.val();
          callback({
            _id: data.key,
            text: data.val().text,
            createdAt: data.val().createdAt * 1000,
            user: {
              _id: data.val().user._id,
              name: data.val().user.name,
            },
          });
        };
        this.messagesRef.limitToLast(20).on('child_added', onReceive);
      }

      // send the message to the Backend
      sendMessage(message) {
        const { params } = this.props.navigation.state;
        for (let i = 0; i < message.length; i++) {
            let numOfMsgs = 0;
            firebaseApp.database().ref('conversations/' + params.conversation_id).child('messages').on("value", (snap) => {
                numOfMsgs = snap.numChildren();
            });
            console.log('So messages: ' + numOfMsgs);
            // var updates = {};
            // updates['/conversations/' + params.conversation_id + '/messages/' + numOfMsgs] = {
            //     text: message[i].text,
            //     user: message[i].user,
            //     createdAt: 1513593127,
            //   };
        //   this.messagesRef.push({
        //     text: message[i].text,
        //     user: message[i].user,
        //     createdAt: new Date(),
        //   });

        var today = new Date().getTime() / 1000;

          this.messagesRef.child(numOfMsgs).set({
                text: message[i].text,
                user: message[i].user,
                createdAt: today,
              });
        }
      }
      // close the connection to the Backend
      closeChat() {
        if (this.messagesRef) {
          this.messagesRef.off();
        }
      }
      componentWillUnmount() {
        this.closeChat();
      }
    

    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={{height: 60, alignItems:'center',justifyContent: 'flex-end',paddingTop: Constants.statusBarHeight,}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold',margin: 10}}>{this.state.nameOfConversation}</Text>
                </View>
                <GiftedChat 
                    messages={this.state.messages}
                    onSend={(message) => {
                        this.sendMessage(message);
                    }}
                    user={{
                        _id: this.state.currentUser,
                        name: this.state.nameOfUser
                    }}
                />
            </View>
        );
    }
}