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
import { GiftedChat } from 'react-native-gifted-chat';
import { firebaseApp } from '../FirebaseConfig';
import myStyles from '../assets/styles/myStyles';
import { Constants } from 'expo';

export default class MessageDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nameOfConversation: 'Conversation',
            messages: [],
            currentUser: '',
        }
        
        this.database = firebaseApp.database();
    }

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
                    messages: snap.val().messages
                });
                console.log(this.state.messages);
            });
          } else {
            console.log('user bị null');
          }
        });
      }

    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={{height: 60, alignItems:'center',justifyContent: 'flex-end',paddingTop: Constants.statusBarHeight,}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold',margin: 10}}>{this.state.nameOfConversation}</Text>
                </View>
                
            </View>
        );
    }
}