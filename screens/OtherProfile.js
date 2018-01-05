import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';
import { Constants, ImagePicker, LinearGradient } from 'expo';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { firebaseApp } from '../FirebaseConfig';
import Carousel from 'react-native-snap-carousel';
import { NavigationActions } from 'react-navigation';
import CustomButton from '../components/CustomButton';
import SlidingUpPanel from 'rn-sliding-up-panel';

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'TabInStack'})
  ],
})

const SCREEN_LABEL = 'Profile';
const STICKY_HEADER_HEIGHT = 40;
const PARALLAX_HEADER_HEIGHT = 350;
const AVATAR_SIZE = 120;
const window = Dimensions.get('window');
const ITEM_WIDTH = 170, ITEM_HEIGHT = 200;
const MAX_POST = 10;

export default class OtherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followed: false,
      name: 'UNKNOWN',  
      profile_picture: 'http://www.theatricalrights.com/wp-content/themes/trw/assets/images/default-user.png',
      numOfPosts: 0,
      posts: [],
      bio: '',
      numOfFollowing: 0,
      numOfFollowers: 0,
      cover: 'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=750&q=80',
      messageVisible: false,
      message: '',
      hasTalked: false,
      oldConversation: '',
    };
    this._onFollowPress = this._onFollowPress.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(text) {
    const { params } = this.props.navigation.state;
    const { navigate, goBack } = this.props.navigation;

    // let d = new Date();
    let createdAt = ((new Date()).getTime() / 1000).toFixed();
    
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user != null) {

        var myInfo = null, userInfo = null;
        var myNumOfMsgs = 0, userNumOfMsgs = 0;
        var myname = '';
        firebaseApp.database().ref('users/' + user.uid).on("value", (snap1) => {
          myname = snap1.val().username;
          myInfo = {
            uid: user.uid,
            profile_photo_url: snap1.val().profile_picture,
            username: myname
          };
          if(snap1.val().conversations) {
            firebaseApp.database().ref('users/' + user.uid + '/conversations').on("value", (consnap) => {
              myNumOfMsgs = consnap.numChildren();
              console.log('myNumOfMsgs: ' + myNumOfMsgs);
            });
          }
        });

        firebaseApp.database().ref('users/' + params.userID).on("value", (snap2) => {
          userInfo = {
            uid: params.userID,
            profile_photo_url: snap2.val().profile_picture,
            username: snap2.val().username
          };
          if(snap2.val().conversations) {
            firebaseApp.database().ref('users/' + params.userID + '/conversations').on("value", (consnap) => {
              userNumOfMsgs = consnap.numChildren();
              console.log('userNumOfMsgs: ' + userNumOfMsgs);
            });
          }
        });

        // A message entry.
        var messageData = {
          createdAt: createdAt,
          color: '#44bec7',
          createdBy: user.uid,
          member: [myInfo, userInfo],
          messages: [{
            createdAt: createdAt,
            text: text,
            user: {
              _id: user.uid,
              name: myname
            }
          }]
        };

        // Get a key for a new Message.
        var newMessageKey = firebaseApp.database().ref().child('conversations').push(messageData).key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        if(userNumOfMsgs > 0) {
          updates['/users/' + params.userID + '/conversations/' + userNumOfMsgs] = { _id: newMessageKey};
        } else {
          firebaseApp.database().ref('users/' + params.userID).child('conversations').set([{ _id: newMessageKey}])
        }
        
        if(myNumOfMsgs > 0) {
          updates['/users/' + user.uid + '/conversations/' + userNumOfMsgs] = { _id: newMessageKey};
        } else {
          firebaseApp.database().ref('users/' + user.uid).child('conversations').set([{ _id: newMessageKey}])
        }

        this.setState({
          messageVisible: !this.state.messageVisible,
          message: '',
          hasTalked: true,
          oldConversation: newMessageKey,
        });
        firebaseApp.database().ref().update(updates);
        navigate('MessageDetail', { conversation_id: newMessageKey })
      }
      else {
        console.log('chưa đăng nhập');
      }
    });
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    var userCons = [];
    if(params.userID) {
        var userRef = firebaseApp.database().ref('users/' + params.userID);
        userRef.on('value', snap => {
          this.setState({
            profile_picture: snap.val().profile_picture,
            name: snap.val().username,
            bio: snap.val().bio,
            cover: snap.val().cover,
            numOfFollowing: snap.val().following ? snap.val().following.length : 0,
            numOfFollowers: snap.val().followers ? snap.val().followers.length : 0,
            numOfPosts: snap.val().posts ? snap.val().posts.length : 0,
          });
          if(snap.val().conversations) {
            snap.val().conversations.forEach(c => {
              userCons.push(c._id);
            });
          }
          if (this.state.numOfPosts > 0) {
            let events = [];
            snap.val().posts.map((post, index) => {
              firebaseApp.database().ref('posts').on("value", (dataSnapShot) => {
                dataSnapShot.forEach(child => {
                  if(post === child.key) {
                    events.push({
                      title: child.val().title,
                      _key: child.key,
                      featuredImage: child.val().featuredImage,
                      // categoryId: child.val().categoryId,
                      // address: child.val().address,
                    });
                  }
                });
              });
  
              this.setState({
                posts: events.reverse().slice(0, MAX_POST)
              });
            });
          }
        });
      }

      firebaseApp.auth().onAuthStateChanged((user) => {
        if (user != null) {
          var userRef = firebaseApp.database().ref('users/' + user.uid);
          userRef.on('value', snap => {
            let following = snap.val().following ? snap.val().following : [];
            if (following != []) {
              following.map((u, index) => {
                if (u === params.userID) {
                  this.setState({
                      followed: true
                  });
                }
              });
            }
            let myCons = [];
            if(snap.val().conversations) {
              snap.val().conversations.forEach(c => {
                myCons.push(c._id);
              });
            }
            
            if(userCons && myCons) {
              let same = userCons.filter((n) => myCons.includes(n));
              if(same) {
                same.forEach(msg => {
                  firebaseApp.database().ref('conversations/' + msg).on("value", (dataSnapShot) => {
                    console.log('dataSnapShot.val().member.length: ' + dataSnapShot.val().member.length);
                    if(dataSnapShot.val().member.length ===2) {
                      this.setState({
                        hasTalked: true,
                        oldConversation: msg,
                      });
                    }
                  });
                })
              }
            }
          });
      }
    });
  }
  _onFollowPress() {
    const { params } = this.props.navigation.state;
    if (this.state.followed) {
        firebaseApp.auth().onAuthStateChanged((user) => {
          if (user != null) {
            let following = [];
            let target1 = -1;
            let followingRef = firebaseApp.database().ref('users/' + user.uid).child('following');
            followingRef.on("value", (snap) => {
                following = snap.val();
            });

            following.map((_id, index) => {
                if (_id === params.userID) {
                    target1 = index;
                }
            });
            if (target1 >= 0) {
                following.splice(target1, 1);
                followingRef.set(following);
            }

            let followers = [];
            let target2 = -1;
            let followersRef = firebaseApp.database().ref('users/' + params.userID).child('followers');
            followersRef.on("value", (snap) => {
                followers = snap.val();
            });
            followers.map((id, index) => {
                if (id === user.uid) {
                    target2 = index;
                }
            });
            if (target2 >= 0) {
                followers.splice(target2, 1);
                followersRef.set(followers);
            }
            this.setState({
                followed: false,
            });
          }
        });
    }
    else {
        firebaseApp.auth().onAuthStateChanged((user) => {
          if (user != null) {
            var updates = {};
            
            let numOfFollowing = 0;
            let followingRef = firebaseApp.database().ref('users/' + user.uid).child('following')
            if(followingRef) {
                followingRef.on("value", (snap) => {
                    numOfFollowing = snap.numChildren();
                });
            }
            updates['/users/' + user.uid + '/following/' + numOfFollowing] = params.userID;

            // update trong posts
            let numOfFollowers = 0;
            let followersRef = firebaseApp.database().ref('users/' + params.userID).child('followers')
            if(followersRef) {
                followersRef.on("value", (snap) => {
                    numOfFollowers = snap.numChildren();
                });
            }
            updates['/users/' + params.userID + '/followers/' + numOfFollowers] = user.uid;

            firebaseApp.database().ref().update(updates);

            this.setState({
                followed: true,
            });
          }
        });
    }
}
    
  static navigationOptions = {
    header: null,
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ profile_picture: result.uri });
      //TODO: upload hinh len firebase
    }
  };

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', }}>
      <ParallaxScrollView
      ref={(scroll) => { this.scrollview = scroll; }}
      backgroundColor="#fff"
      backgroundSpeed={10}
      parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
      stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
      renderBackground={() => (
      <View>
        <Image source={{
            uri: this.state.cover,
            width: window.width,
            height: PARALLAX_HEADER_HEIGHT - 100, 
            marginBottom: 50
        }}>
        </Image>
        
    </View>)}
    renderForeground={() => (
      <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: 'transparent', alignItems: 'center', paddingTop: Constants.statusBarHeight, }}>
          <View style={{ width: window.width, backgroundColor: 'transparent', position: 'absolute', top: 0, height: PARALLAX_HEADER_HEIGHT, alignItems: 'center', justifyContent: 'flex-start', paddingTop: PARALLAX_HEADER_HEIGHT - 100 - (AVATAR_SIZE / 2) - 10}}>
          <TouchableOpacity onPress={this._pickImage}>
            <Image style={{borderColor: '#fff', backgroundColor: '#fff', borderWidth: 5, borderRadius: AVATAR_SIZE / 2, width: AVATAR_SIZE, height: AVATAR_SIZE, }} source={{
              uri: this.state.profile_picture, }}
            />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.state.name}</Text>
            <Text style={{ fontSize: 16, color: '#ccc' }}>
              {this.state.bio}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: window.width,
            backgroundColor: "transparent",
            position: "absolute",
            top: Constants.statusBarHeight,
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
          }}>
          <TouchableOpacity
            onPress={() => goBack()}>
            <View
              style={{ flexDirection: "row", marginTop: 30, margin: 20, }}>
              <Ionicons
                name={"ios-arrow-back"}
                size={28}
                color={"#fff"}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white"
                }}> Back</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
  )}
      renderStickyHeader={() => (
        <View key="sticky-header" style={{height: STICKY_HEADER_HEIGHT, alignItems:'center',justifyContent: 'flex-end',paddingTop: Constants.statusBarHeight,}}>
          <Text style={{fontSize: 18, fontWeight: 'bold',margin: 10}}
          onPress={() => this.scrollview.scrollTo({ x: 0, y: 0 })}>{this.state.name}</Text>
        </View>
      )}>

      <View style={{ height: 40, flexDirection: 'row', justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>{this.state.numOfPosts}</Text>
          <Text style={{ fontSize: 14, textAlign: 'center'}}>posts</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>{this.state.numOfFollowers}</Text>
          <Text style={{ fontSize: 14, textAlign: 'center'}}>followers</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>{this.state.numOfFollowing}</Text>
          <Text style={{ fontSize: 14, textAlign: 'center'}}>following</Text>
        </View>
      </View>
      <View
        style={{
            marginLeft: 10, 
            marginRight: 10,
            borderBottomColor: '#d2d2d2',
            borderBottomWidth: 1,
        }} />
      <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 10, justifyContent: 'space-around', alignSelf: 'stretch', flexDirection: 'row' }}>
        
      {this.state.followed ? 
        <CustomButton 
          text={'Following'}
          width={120}
          height={40}
          borderWidth={0}
          fontSize={18}
          backgroundColor = '#5F4B8B'
          color={'#fff'}
          onPress={() => this._onFollowPress()}
        />: <CustomButton 
        fontSize={18}
        text={'Follow'}
        width={120}
        height={40}
        borderWidth={1}
        backgroundColor = '#fff'
        color={'#5F4B8B'}
        borderColor={'#5F4B8B'}
        onPress={() => this._onFollowPress()}
      /> }
        <CustomButton 
          fontSize={18}
          text={'Message'}
          width={120}
          height={40}
          borderWidth={1}
          backgroundColor = '#fff'
          color={'#5F4B8B'}
          borderColor={'#5F4B8B'}
          onPress={() => {
            if(this.state.hasTalked && this.state.oldConversation != '') {
              navigate('MessageDetail', { conversation_id: this.state.oldConversation })
            } else {
              this.setState({messageVisible: !this.state.messageVisible});
            }
          }}
        />
      </View>
      <View
        style={{
            marginLeft: 10, 
            marginRight: 10,
            borderBottomColor: '#d2d2d2',
            borderBottomWidth: 1,
        }} />
      { this.state.numOfPosts > 0 ? 
      <View>
        <View
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,
            paddingBottom: 10,
            justifyContent: "space-between",
            alignSelf: "stretch",
            flexDirection: "row"
          }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {this.state.name}'s recent posts
          </Text>
          <Text style={{ fontSize: 16, color: "#FF5252" }}>
            See all <Ionicons name={"ios-arrow-forward"} size={16} />
          </Text>
        </View>
        <Carousel
          data={this.state.posts}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigate("PostDetail", { postID: item._key });
                }}
              >
                {this._renderPosts({ item, index })}
              </TouchableOpacity>
            );
          }}
          sliderWidth={window.width}
          itemWidth={170}
          activeSlideAlignment={"start"}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
        /> 
      </View> : 
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{ fontSize: 24, fontWeight: '600', color: '#CCCCCC' }}>No Posts</Text>
        </View> }
        </ParallaxScrollView>
        <SlidingUpPanel
          allowDragging={false}
          ref={c => this._panel = c}
          visible={this.state.messageVisible}
          onRequestClose={() => this.setState({messageVisible: false})}>
          <KeyboardAvoidingView>
          <View style={{
            height: window.height - 440,
            width: window.width - 40,
            borderRadius: 20,
            backgroundColor: '#fff',
            marginLeft: 20,
            marginRight: 20,
            marginTop: 220,
            marginBottom: 220, 
          }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10, 
            paddingBottom: 10
          }}>
          <TouchableOpacity onPress={() => this.setState({
            messageVisible: !this.state.messageVisible,
            message: ''
          })}>
            <Text style={{ fontSize: 20 }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            if(this.state.message != '') {
              this.sendMessage(this.state.message);
            }
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: this.state.message != '' ? '#5F4B8B' : '#999' }}>Send</Text>
          </TouchableOpacity>
          </View>
          <View
            style={{
                borderBottomColor: '#d2d2d2',
                borderBottomWidth: 1,
            }} />
          <View style={{}}><Text style={{ fontSize: 18 }}>To: <Text style={{color: '#5F4B8B'}}>{this.state.name}</Text></Text></View>
          <View style={{flex: 1, padding: 20}}>
            <TextInput 
              placeholder="Write a message..."
              multiline={true}
              placeholderTextColor="#999"
              onChangeText={(message) => this.setState({message})}
              value={this.state.message}
              style={{ fontSize: 20 }}
              />
          </View>
          </View>
          </KeyboardAvoidingView>
        </SlidingUpPanel>
      </View>
    );
  }

  _renderPosts({ item, index }) {
    return (
      <View
        style={{
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 20,
        }}>
        <View
          style={{
            borderRadius: 10,
            marginBottom: 5,
          }}>
          <Image
            source={{ uri: item.featuredImage }}
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              borderRadius: 10,
              flex: 1,
            }}
            resizeMode="cover">
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-end',
                flexDirection: 'column',
              }}>
              <LinearGradient
                colors={[
                  'rgba(0, 0, 0, 0)',
                  'rgba(0, 0, 0, 0.125)',
                  'rgba(0, 0, 0, 0.25)',
                ]}
                style={{
                  width: ITEM_WIDTH,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#fff',
                    backgroundColor: 'transparent',
                    fontWeight: 'bold' }}>{item.title}</Text>
              </LinearGradient>
            </View>
          </Image>
        </View>
      </View>
    );
  }
}