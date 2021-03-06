import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';
import { firebaseApp } from '../FirebaseConfig';
import { Constants, LinearGradient } from 'expo';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Modal from 'react-native-modal';
import AddNewPost from '../components/AddNewPost';
import Loading from '../components/Loading';

const SCREEN_LABEL = 'Explore';
const STICKY_HEADER_HEIGHT = 40;
const window = Dimensions.get('window');
const ITEM_WIDTH = 240, ITEM_HEIGHT = 280;
const MAX_POST = 10;

export default class ExploreScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      visibleModal: false,
      latestPosts: [],
      categories: [],
      latestEvents: [],
      users: [],
      myLastPost: null,
      myUid: '',
      profile_picture: 'http://www.theatricalrights.com/wp-content/themes/trw/assets/images/default-user.png',
    };

    this.database = firebaseApp.database();
    this._renderSpecialPost = this._renderSpecialPost.bind(this);
  }

  static navigationOptions = {
    header: null,
    tabBarLabel: SCREEN_LABEL,
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-compass' : 'ios-compass-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  };

  listenForEvents(database) {
    database.ref('users').on('value', snap => {
      let events = [];
      snap.forEach(child => {
        events.push({
          username: child.val().username,
          userId: child.key,
          profile_picture: child.val().profile_picture,
        });

        this.setState({
          users: events,
        });
      });
    });

    database.ref('post_categories').on('value', snap => {
      let events = [];
      snap.forEach(child => {
        events.push({
          name: child.val().name,
          _key: child.key,
          featuredImage: child.val().featuredImage,
          description: child.val().description,
        });
      });

      this.setState({
        categories: events,
      });
    });

    database.ref('events').on('value', snap => {
      let events = [{ flag: 0 }];
      snap.forEach(child => {
        events.push({
          flag: 1,
          title: child.val().title,
          _key: child.key,
          featuredImage: child.val().featuredImage,
          description: child.val().description,
          userId: child.val().userId,
          username: "",
          address: child.val().address,
        });
      });

      events.map((item, index) => {
        let users = this.state.users;
        users.map((user, i) => {
          if (item.userId == user.userId) {
            item.username = user.username;
          }
        });
      });

      this.setState({
        latestEvents: events.reverse().slice(0, MAX_POST),
      });
    });

    database.ref('posts').on('value', snap => {
      let events = [];
      snap.forEach(child => {
        events.push({
          title: child.val().title,
          _key: child.key,
          featuredImage: child.val().featuredImage,
          categoryId: child.val().categoryId,
          category: 'Unknown',
          userId: child.val().userId,
          username: child.val().userId,
          address: child.val().address,
          description: child.val().description,
          //content: child.val().content,
          //uri: child.val().uri,
          //time: child.val().time,
        });
      });

      events.map((item, index) => {
        let categories = this.state.categories;
        let users = this.state.users;
        categories.map((cat, i) => {
          if (item.categoryId == cat._key) {
            item.category = cat.name;
          }
        });

        users.map((user, i) => {
          if (item.userId == user.userId) {
            item.username = user.username;
          }
        });
      });

      this.setState({
        latestPosts: events.reverse().slice(0, MAX_POST),
        isLoading: false,
      });
    });
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user != null) {
        var userRef = firebaseApp.database().ref('users/' + user.uid);
        userRef.on('value', snap => {
          this.setState({
            profile_picture: snap.val().profile_picture,
            myUid: user.uid,
          });

          if (snap.val().posts) {
            let lastPostId = snap.val().posts.slice(-1)[0];
            var postRef = firebaseApp.database().ref('posts/' + lastPostId);
            postRef.on('value', child => {
              //let events = [];
              //events.push();
              this.setState({
                myLastPost: {
                  _key: child.key,
                  title: child.val().title,
                  featuredImage: child.val().featuredImage,
                },
              });
            });
          }
        });
      } else {
        console.log('user bị null');
      }
    });
    this.listenForEvents(this.database);
  }

  _renderPosts({ item, index }) {
    return (
      <View
        style={{
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 20,
        }}>
          <LinearGradient colors={['#c6e2ff', '#ffc0cb']} style={{ padding: 0, width: ITEM_WIDTH, height: ITEM_HEIGHT, borderRadius: 10, marginBottom: 5, }}>
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
                justifyContent: 'space-between',
                flexDirection: 'column',
              }}>
              <LinearGradient
                colors={[
                  'rgba(0, 0, 0, 0.25)',
                  'rgba(0, 0, 0, 0.125)',
                  'rgba(0, 0, 0, 0)',
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
                    fontWeight: 'bold',
                  }}>
                  {item.category}
                </Text>
              </LinearGradient>
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
                  justifyContent: 'flex-end',
                  padding: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#fff',
                    backgroundColor: 'transparent',
                  }}>
                  by <Text style={{ fontWeight: 'bold' }}>{item.username}</Text>
                </Text>
              </LinearGradient>
            </View>
          </Image>
          </LinearGradient>
        <View style={{ width: ITEM_WIDTH }}>
          <Text style={{ fontSize: 18, textAlign: 'left', fontWeight: 'bold' }}>
            {item.title}
          </Text>
          <Text
            numberOfLines={2}
            style={{ fontSize: 14, textAlign: 'left', color: '#d2d2d2' }}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  }

  _renderEvents({ item, index }) {
    return (
      item.flag !== 0 ?
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 20,
          }}>
          <LinearGradient colors={['#c6e2ff', '#ffc0cb']} style={{ padding: 0, width: ITEM_WIDTH, height: ITEM_HEIGHT, borderRadius: 10, marginBottom: 5, }}>
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
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                }}>
                <LinearGradient
                  colors={[
                    'rgba(0, 0, 0, 0.25)',
                    'rgba(0, 0, 0, 0.125)',
                    'rgba(0, 0, 0, 0)',
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
                      fontWeight: 'bold',
                    }}>
                    {item.address}
                  </Text>
                </LinearGradient>
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
                    justifyContent: 'flex-end',
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#fff',
                      backgroundColor: 'transparent',
                    }}>
                    by <Text style={{ fontWeight: 'bold' }}>{item.username}</Text>
                  </Text>
                </LinearGradient>
              </View>
            </Image>
          </LinearGradient>
          <View style={{ width: ITEM_WIDTH }}>
            <Text style={{ fontSize: 18, textAlign: 'left', fontWeight: 'bold' }}>
              {item.title}
            </Text>
            <Text
              numberOfLines={2}
              style={{ fontSize: 14, textAlign: 'left', color: '#d2d2d2' }}>
              {item.description}
            </Text>
          </View>
        </View> :
        <View
          style={{
            width: ITEM_WIDTH,
            height: ITEM_HEIGHT,
            borderRadius: 10,
            flex: 1,
            borderWidth: 2,
            borderColor: 'grey',
            borderStyle: 'dashed',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 20,
          }}>
          <Ionicons name={'md-add'} color={'black'} size={30} />
          <Text style={{ fontSize: 18 }}> Add new events</Text>
        </View>
    );
  }

  _renderCategories({ item, index }) {
    return (
      <View
        style={{
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 20,
          borderRadius: 10,
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
            }}>
            <LinearGradient
              colors={[
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0.125)',
                'rgba(0, 0, 0, 0.25)',
              ]}
              style={{
                width: ITEM_WIDTH,
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-around',
                padding: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#fff',
                  backgroundColor: 'transparent',
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  backgroundColor: 'transparent',
                  fontSize: 12,
                  color: '#ffffff8c',
                }}>
                {item.description}
              </Text>
            </LinearGradient>
          </View>
        </Image>
      </View>
    );
  }

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <AddNewPost
        onCancelPress={() => this.setState({ visibleModal: false })}
      />
    </View>
  );

  _renderSpecialPost = () => (
    <LinearGradient colors={['#c6e2ff', '#ffc0cb']} style={{ padding: 0, width: window.width - 40, height: 260, borderRadius: 10, margin: 20, }}>
      <Image
        source={{
          //uri: 'http://kenh14cdn.com/thumb_w/660/2017/lang-phap-kt-1510804667959.jpg',
          uri: this.state.myLastPost.featuredImage
        }}
        style={{
          width: window.width - 40,
          height: 260,
          borderRadius: 10,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        resizeMode="cover">
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: 'transparent',
          }}>
          {this.state.myLastPost.title}
        </Text>
      </Image>
    </LinearGradient>
  );

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          paddingTop: Constants.statusBarHeight,
        }}>
        <ParallaxScrollView
          ref={scroll => {
            this.scrollview = scroll;
          }}
          backgroundColor="#fff"
          contentBackgroundColor="#fff"
          parallaxHeaderHeight={100}
          stickyHeaderHeight={STICKY_HEADER_HEIGHT}
          renderForeground={() => (
            <View style={myStyles.screenHeader}>
              <Text
                style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10 }}>
                {SCREEN_LABEL}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  //navigate('Profile', { userId: this.state.myUid });
                  navigate('Profile');
                }}
                style={{
                  marginBottom: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 5,
                  borderRadius: 50 / 2,
                  borderColor: '#FF5252',
                }}>
                <Image
                  style={{ borderRadius: 40 / 2, width: 40, height: 40 }}
                  source={{ uri: this.state.profile_picture }}
                />
              </TouchableOpacity>
            </View>
          )}
          renderStickyHeader={() => (
            <View
              key="sticky-header"
              style={{
                height: STICKY_HEADER_HEIGHT,
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingTop: Constants.statusBarHeight,
              }}>
              <Text
                style={{ fontSize: 18, fontWeight: 'bold', margin: 10 }}
                onPress={() => this.scrollview.scrollTo({ x: 0, y: 0 })}>
                {SCREEN_LABEL}
              </Text>
            </View>
          )}>
          {this.state.isLoading
            ? <Loading />
            : <View>
              {/*Headline*/}
              <View
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                  justifyContent: 'space-between',
                  alignSelf: 'stretch',
                  flexDirection: 'row',
                }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Latest Stories
                  </Text>
                <Text style={{ fontSize: 16, color: '#FF5252' }}>
                  See more <Ionicons name={'ios-arrow-forward'} size={16} />
                </Text>
              </View>
              <Carousel
                data={this.state.latestPosts}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
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

              {/*Headline*/}
              {this.state.myLastPost != null ? <View>
                <View
                  style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 10,
                    paddingBottom: 10,
                    justifyContent: 'space-between',
                    alignSelf: 'stretch',
                    flexDirection: 'row',
                  }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    Your last post
                  </Text>
                  <Text style={{ fontSize: 16, color: '#FF5252' }}>
                    See all <Ionicons name={'ios-arrow-forward'} size={16} />
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigate('PostDetail', { postID: this.state.myLastPost._key });
                  }}>
                  {this._renderSpecialPost()}
                </TouchableOpacity>
              </View> : null}

              {/*Headline
                <View
                  style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 10,
                    paddingBottom: 10,
                    justifyContent: 'space-between',
                    alignSelf: 'stretch',
                    flexDirection: 'row',
                  }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    Let's Check-In
                  </Text>
                  <Text style={{ fontSize: 16, color: '#FF5252' }}>
                    See all <Ionicons name={'ios-arrow-forward'} size={16} />
                  </Text>
                </View>
                <Carousel
                  data={this.state.dataSource.filter(
                    story => story.categoryId === 3
                  )}
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
                />*/}

              <View
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                  justifyContent: 'space-between',
                  alignSelf: 'stretch',
                  flexDirection: 'row',
                }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Latest Events
                  </Text>
                <Text style={{ fontSize: 16, color: '#FF5252' }}>
                  See more <Ionicons name={'ios-arrow-forward'} size={16} />
                </Text>
              </View>
              <Carousel
                data={this.state.latestEvents}
                renderItem={({ item, index }) => {
                  return (
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          if (item.flag === 0)
                            console.log('you\'ve just clicked create new event');
                          else
                            navigate('EventDetail', { eventID: item._key });
                        }}>
                        {this._renderEvents({ item, index })}
                      </TouchableOpacity>
                    </View>
                  );
                }}
                sliderWidth={window.width}
                itemWidth={260}
                activeSlideAlignment={'start'}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
              />

              {/*Headline*/}
              {/*<View
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                  justifyContent: 'space-between',
                  alignSelf: 'stretch',
                  flexDirection: 'row',
                }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Categories
                  </Text>
                <Text style={{ fontSize: 16, color: '#FF5252' }}>
                  See all <Ionicons name={'ios-arrow-forward'} size={16} />
                </Text>
              </View>
              <Carousel
                data={this.state.categories}
                renderItem={this._renderCategories}
                sliderWidth={window.width}
                itemWidth={260}
                activeSlideAlignment={'start'}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
              />*/}
            </View>}
        </ParallaxScrollView>

        <TouchableOpacity
          onPress={() => {
            this.setState({ visibleModal: true });
          }}>
          <View
            style={{
              backgroundColor: '#FF5252',
              width: 60,
              height: 60,
              borderRadius: 30,
              position: 'absolute',
              bottom: 30,
              right: 30,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: -2, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 1,
            }}>
            <Ionicons name={'md-add'} size={32} color={'#FFF'} />
          </View>
        </TouchableOpacity>
        <Modal isVisible={this.state.visibleModal} style={styles.bottomModal}>
          {this._renderModalContent()}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#fff',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: window.height,
    width: window.width,
    paddingTop: Constants.statusBarHeight,
  },
  bottomModal: {
    margin: 0,
  },
});
