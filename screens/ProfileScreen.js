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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';
import { Constants, ImagePicker, LinearGradient } from 'expo';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { firebaseApp } from '../FirebaseConfig';
import Carousel from 'react-native-snap-carousel';
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'TabInStack'})
  ],
})

const SCREEN_LABEL = 'Profile';
const STICKY_HEADER_HEIGHT = 40;
const AVATAR_SIZE = 80;
const window = Dimensions.get('window');
const ITEM_WIDTH = 240, ITEM_HEIGHT = 280;
const MAX_POST = 10;

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'UNKNOWN', 
      email: 'UNKNOWN', 
      photoUrl: '', 
      profile_picture: 'http://www.theatricalrights.com/wp-content/themes/trw/assets/images/default-user.png',
      uid: '', 
      emailVerified: false,
      numOfPosts: 0,
      myPosts: [],
      bio: '',
      numOfFollowing: 0,
      numOfFollowers: 0,
    };
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user != null) {
        var userRef = firebaseApp.database().ref('users/' + user.uid);
        userRef.on('value', snap => {
          this.setState({
            profile_picture: snap.val().profile_picture,
            name: snap.val().username,
            bio: snap.val().bio,
            numOfFollowing: snap.val().following ? snap.val().following.length : 0,
            numOfFollowers: snap.val().followers ? snap.val().followers.length : 0,
            numOfPosts: snap.val().posts ? snap.val().posts.length : 0,
          });

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
                myPosts: events.reverse().slice(0, MAX_POST)
              });
              //console.log(this.state.myPosts);
            });
          }
        });
        
        this.setState({
          //name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL, 
          emailVerified: user.emailVerified,
          uid: user.uid,  // The user's ID, unique to the Firebase project. Do NOT use
                          // this value to authenticate with your backend server, if
                          // you have one. Use User.getToken() instead.
        });
    }});
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
      <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Constants.statusBarHeight, }}>
      <ParallaxScrollView
      ref={(scroll) => { this.scrollview = scroll; }}
      backgroundColor="#fff"
      contentBackgroundColor="#fff"
      parallaxHeaderHeight={100}
      stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
      renderForeground={() => (
        <View  style={{ flexDirection: 'column', paddingTop: 25 }}>
          <TouchableOpacity 
            onPress={() => goBack()}>
            <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20 }}>
                <Ionicons name={'ios-arrow-back'} size={28}/> 
                <Text style={{fontSize: 20, fontWeight: 'bold',}}> Back</Text>
            </View>
          </TouchableOpacity>
          <View style={{ paddingTop: 5, paddingLeft: 20, paddingRight: 20, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row'}}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, }}>{SCREEN_LABEL}</Text>
            <TouchableOpacity onPress={()=>{ console.log('Setting'); }}>
              <Text style={{ marginBottom: 10 }}><Ionicons name={'ios-settings-outline'} size={30} /></Text>
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
      <View style={{ flexDirection:'row' }}>
      
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5, marginBottom: 20}}>
        <TouchableOpacity onPress={this._pickImage}>
          <Image style={{borderRadius: AVATAR_SIZE / 2, width: AVATAR_SIZE, height: AVATAR_SIZE}} source={{
            uri: this.state.profile_picture, }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 2, justifyContent: 'space-around', padding: 20, alignContent: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.state.name}</Text>
      <Text style={{ fontSize: 16, color: '#ccc' }}>
        {this.state.bio}
      </Text>
    </View>
  </View>
      <View style={{ height: 30, flexDirection: 'row', justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>{this.state.numOfPosts}</Text>
          <Text style={{ fontSize: 12, textAlign: 'center'}}>posts</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>{this.state.numOfFollowers}</Text>
          <Text style={{ fontSize: 12, textAlign: 'center'}}>followers</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>{this.state.numOfFollowing}</Text>
          <Text style={{ fontSize: 12, textAlign: 'center'}}>following</Text>
        </View>
      </View>
      <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 10, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold',}}>About me</Text>
        <Text style={{ fontSize: 16, color: '#FF5252' }}>Edit</Text>
      </View>
      <View
        style={{
            marginLeft: 10, 
            marginRight: 10,
            borderBottomColor: '#d2d2d2',
            borderBottomWidth: 1,
        }} />
      <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 10, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold',}}>{this.state.name}'s recent posts</Text>
        <Text style={{ fontSize: 16, color: '#FF5252' }}>
          See all <Ionicons name={'ios-arrow-forward'} size={16} />
        </Text>
      </View>
      <Carousel
        data={this.state.myPosts}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigate('PostDetail', { postID: item._key });
              }}>
              {this._renderPosts({ item, index })}
            </TouchableOpacity>
          );
        }}
        sliderWidth={window.width}
        itemWidth={260}
        activeSlideAlignment={'start'}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />
      <View
        style={{
            marginLeft: 10, 
            marginRight: 10,
            borderBottomColor: '#d2d2d2',
            borderBottomWidth: 1,
        }} />
      <TouchableOpacity onPress={() => {
        firebaseApp.auth().signOut().then(function() {
          //TODO: Hành động sau khi signout 
          this.props.navigation.dispatch(resetAction)
        }).catch(function(error) {
          // An error happened.
        });
      }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ color: 'red', fontSize: 20 }}>Sign Out</Text>
        </View>
      </TouchableOpacity>
        </ParallaxScrollView>
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