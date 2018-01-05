import React, { Component } from "react";
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
} from "react-native";
import {
  GiftedChat,
  Actions,
  Bubble,
  SystemMessage,
  GiftedAvatar,
  Composer,
  InputToolbar,
  Send
} from "react-native-gifted-chat";
import { firebaseApp } from "../FirebaseConfig";
import myStyles from "../assets/styles/myStyles";
import { Constants } from "expo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MessageSetting from "../components/MessageSetting";
import Drawer from "react-native-drawer";
import Loading from '../components/Loading';

export default class MessageDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameOfConversation: "Conversation",
      nameOfUser: "",
      messages: [],
      members: [],
      currentUser: "",
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
      color: "blue",
      drawerOpen: false,
      drawerDisabled: false,
      isLoading: true,
    };

    this.database = firebaseApp.database();
    this._renderBubble = this._renderBubble.bind(this);
    this._renderActions = this._renderActions.bind(this);
    this._renderComposer = this._renderComposer.bind(this);
    this._renderInputToolbar = this._renderInputToolbar.bind(this);
    this._renderSend = this._renderSend.bind(this);
  }
  messagesRef = null;

  static navigationOptions = {
    header: null
  };

  _renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            //backgroundColor: Colors.primary
            backgroundColor: this.state.color,
          }
        }}
      />
    );
  }

  _renderActions(props) {
    return (
      <Actions
        {...props}
        containerStyle={{ marginLeft: 5 }}
        onPressActionButton={() => {
          console.log("Action press");
        }}
        icon={() => (
          <Ionicons
            name={"ios-add-circle"}
            size={32}
            color={this.state.color}
          />
        )}
        optionTintColor={this.state.color}
      />
    );
  }

  _renderComposer(props) {
    return (
      <Composer
        {...props}
        textInputStyle={{
          borderRadius: 20,
          paddingLeft: 10,
          paddingRight: 10,
          backgroundColor: "#f5f4f2",
          flex: 1
        }}
      />
    );
  }
  _renderInputToolbar(props) {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          paddingLeft: 5,
          paddingRight: 5,
          justifyContent: "center",
          alignItems: "center"
        }}
      />
    );
  }

  _renderSend(props) {
    return (
      <Send
        {...props}
        textStyle={{ color: this.state.color }}
        containerStyle={{ justifyContent: "center", alignItems: "center" }}
      />
    );
  }
  
  otherMember = [];

  componentDidMount() {
    const { params } = this.props.navigation.state;

    firebaseApp.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.database.ref("users/" + user.uid).on("value", snap => {
          this.setState({
            currentUser: user.uid,
            nameOfUser: snap.val().username
          });
        });
        let numOfMembers = 2;
        this.database
          .ref("conversations/" + params.conversation_id)
          .on("value", snap => {
            this.setState({
              //messages: snap.val().messages
              color: snap.val().color,
              //members: snap.val().member,
              numOfMembers: snap.val().member.length
            });
            //console.log('num of mems: ' + numOfMembers);
            let name = snap.val().name;
            if (numOfMembers === 2) {
              snap.val().member.forEach(mem => {
                if (mem.uid !== this.state.currentUser) {
                  name = mem.username;
                }
              });
            }
            snap.val().member.forEach(mem => {
              if(mem.uid !== this.state.currentUser) {
                this.otherMember.push(mem.uid);
              }
            });
            // console.log('otherMember: ' + this.otherMember)
            setTimeout(() => {
              this.setState({
                isLoading: false
              })
            }, 500);
            this.setState({
              nameOfConversation: name
            });
          });

        this.loadMessages(message => {
          this.setState(previousState => {
            return {
              messages: GiftedChat.append(previousState.messages, message)
            };
          });
        });
      } else {
        console.log("user bị null");
      }
    });
  }

  loadMessages(callback) {
    const { params } = this.props.navigation.state;
    this.messagesRef = this.database.ref(
      "conversations/" + params.conversation_id + "/messages"
    );
    this.messagesRef.off();
    const onReceive = data => {
      //const message = data.val();
      callback({
        _id: data.key,
        text: data.val().text,
        createdAt: data.val().createdAt * 1000,
        user: {
          _id: data.val().user._id,
          name: data.val().user.name
        }
      });
    };
    this.messagesRef.limitToLast(20).on("child_added", onReceive);
  }

  // send the message to the Backend
  sendMessage(message) {
    const { params } = this.props.navigation.state;
    for (let i = 0; i < message.length; i++) {
      let numOfMsgs = 0;
      firebaseApp
        .database()
        .ref("conversations/" + params.conversation_id)
        .child("messages")
        .on("value", snap => {
          numOfMsgs = snap.numChildren();
        });
      //console.log('So messages: ' + numOfMsgs);
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
        createdAt: today
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

  closeDrawer = () => {
    this._drawer.close();
  };
  openDrawer = () => {
    this._drawer.open();
  };

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <Drawer
        ref={ref => (this._drawer = ref)}
        type="displace"
        content={
          this.state.isLoading ? <Loading/> :
          <MessageSetting 
            closeDrawer={this.closeDrawer}
            list={this.otherMember}
            navigation={this.props.navigation} />
        }
        acceptDoubleTap
        onOpen={() => {
          this.setState({ drawerOpen: true });
        }}
        onClose={() => {
          this.setState({ drawerOpen: false });
        }}
        captureGestures={false}
        //tweenDuration={100}
        panThreshold={0.08}
        disabled={this.state.drawerDisabled}
        //openDrawerOffset={() => 150}
        side={'right'}
        //closedDrawerOffset={() => 50}
        panOpenMask={0.2}
        negotiatePan
        acceptPan={false}
      >
        <View
          style={{
            backgroundColor: "#fff",
            flex: 1,
            paddingTop: Constants.statusBarHeight
          }}
        >
          <View
            style={{
              height: 40,
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: 20,
              paddingRight: 20,
              flexDirection: "row"
            }}
          >
            <TouchableOpacity onPress={() => goBack()}>
              <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                <Ionicons name={'ios-arrow-back'} size={28}/> 
                <Text style={{fontSize: 20,}}> Back</Text>
              </View>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {this.state.nameOfConversation}
            </Text>
            <TouchableOpacity
              onPress={this.openDrawer}
            >
              <View style={{marginLeft: 10, marginRight: 10}}><Ionicons
              name={"ios-information-circle-outline"}
              size={28}
              color={this.state.color}
            /></View>
            </TouchableOpacity>
          </View>
          <GiftedChat
            messages={this.state.messages}
            onSend={message => {
              this.sendMessage(message);
            }}
            user={{
              _id: this.state.currentUser,
              name: this.state.nameOfUser
            }}
            renderBubble={this._renderBubble}
            //renderChatFooter
            renderActions={this._renderActions}
            renderComposer={this._renderComposer}
            renderInputToolbar={this._renderInputToolbar}
            renderSend={this._renderSend}
          />
        </View>
      </Drawer>
    );
  }
}
