import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { Constants } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { firebaseApp } from '../FirebaseConfig';

const stories = { userId: 'ABC001', storyId: 'DEF001', storyBanner: 'https://media.cntraveler.com/photos/59f2628a36ffdc5d6930ae2d/master/w_1440,c_limit/Sighisoara-GettyImages-178961954.jpg', storyTitle: 'Sighișoara', storyTags: ['romania', 'beautiful', 'transylvania', 'UNESCO'], storyContent: 'This small, medieval town in Transylvania has a UNESCO-protected historic center and charming streets lined with colorful houses. But beware: It\'s also the the birthplace of Vlad the Impaler, and is considered one of the world\'s most haunted cities.', storyLoves: 155, storyComments: 3, };
const window = Dimensions.get('window');
const STICKY_HEADER_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 300;

const colorpallete = [ '#ff6363', '#ff7474', '#ff8585', '#ff9797', '#ffa8a8', '#ffb9b9', '#ffcbcb',];

export default class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userId: 'User ID',
            username: 'User Name',
            profile_picture: 'http://www.theatricalrights.com/wp-content/themes/trw/assets/images/default-user.png',
            postId: 'Post ID',
            title: 'Title',
            featuredImage: 'http://drpattydental.com/wp-content/uploads/2017/05/placeholder.png',
            content: 'Nothing.',
            address: '',
            categoryId: 'Unknown',
            description: '',
            images: [],
            tags: [ 'travel', 'app', 'outdoor', 'quẩy', 'bôn', 'lành', 'ahihi', 'tag nè', 'app tuyệt vời'],
            loves: 0,
            time: 1511978923,
        };
    }

    static navigationOptions = {
        header: null,
      }

    componentDidMount() {
        const { params } = this.props.navigation.state;

        let postRef = firebaseApp.database().ref('posts/' + params.postID);
        postRef.on('value', snap => {
            this.setState({
                userId: snap.val().userId,
                postId: snap.key,
                title: snap.val().title,
                featuredImage: snap.val().featuredImage,
                content: snap.val().content,
                description: snap.val().description,
                loves: snap.val().loves,
                time: snap.val().time,
                tags: snap.val().tags,
            });
        });
    }

    timeConverter = (timestamp) => {
        let date = new Date(timestamp * 1000),
            months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let	year = date.getFullYear(),
            month = months[date.getMonth()],
            day = date.getDate();
        let hours = date.getHours(),
            minutes = "0" + date.getMinutes(),
            seconds = "0" + date.getSeconds();
        if (hours == 0)
            return day + '-' + month + '-' + year + ' ' + 12 + ':' + minutes + ':' + seconds.substr(-2) + ' AM';
        else if (hours == 12)
            return day + '-' + month + '-' + year + ' ' + 12 + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' PM';
        else if(hours < 12)
            return day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds.substr(-2) + ' AM';
        else 
            return day + '-' + month + '-' + year + ' ' + (hours - 12) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' PM';
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
            <ParallaxScrollView
                ref={(scroll) => { this.scrollview = scroll; }}
              backgroundColor="white"
              stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
              parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
              backgroundSpeed={10}
              renderBackground={() => (
                <View>
                    <Image source={{
                        uri: this.state.featuredImage, 
                        width: window.width,
                        height: PARALLAX_HEADER_HEIGHT}}/>
                    <View style={{position: 'absolute',
                        top: 0,
                        width: window.width,
                        backgroundColor: 'transparent',
                        height: PARALLAX_HEADER_HEIGHT}}/>
                </View>
              )}
              renderForeground={() => (
                <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingTop: Constants.statusBarHeight, }}>
                    <View 
                        style={{width: window.width, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', }}>
                        <TouchableOpacity 
                            onPress={() => goBack()}>
                            <View style={{ flexDirection: 'row', marginTop: 30, margin: 20 }}>
                                <Ionicons name={'ios-arrow-back'} size={28} color={'#fff'}/> 
                                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white',}}> Back</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: 'white'}}>{this.state.title}</Text>
                </View>
              )}
              renderStickyHeader={() => (
                <View key="sticky-header" style={{height: STICKY_HEADER_HEIGHT, alignItems:'center',justifyContent: 'flex-end',}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold',margin: 10}}
                    onPress={() => this.scrollview.scrollTo({ x: 0, y: 0 })}>{this.state.userId}'s Story</Text>
                </View>
              )}>
                <View style={{ flex: 1, padding: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 10, textAlign: 'center'}}>{this.state.description}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', padding: 10 }}> 
                            <Text style={{fontSize: 20, color: 'black', alignItems: 'center',}}><Ionicons name={'ios-heart-outline'} size={20}/> {this.state.loves}</Text>
                            <Text style={{fontSize: 20, color: 'black',}}>something</Text>
                        </View>
                        <View
                            style={{
                                marginLeft: 10, 
                                marginRight: 10,
                                borderBottomColor: '#d2d2d2',
                                borderBottomWidth: 1,
                            }} />
                <View style={{flexDirection:'row', marginTop: 10}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                        <Image style={{borderRadius: 40, width: 80, height: 80 }} 
                        source={{uri: this.state.profile_picture}}
                        />
                    </View>
                    <View style={{ flex: 3, justifyContent: 'space-around', alignContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.state.username}</Text>
                        <Text style={{ fontSize: 14, color: '#ff9797'}}>
                        Yêu màu tím , thích màu hồng, sống nội tâm, hay khóc thầm, ghét sự giả dối.
                        </Text>
                    </View>
                </View>
                <View
                style={{
                    marginTop: 20, 
                    marginBottom: 20,
                    borderBottomColor: '#d2d2d2',
                    borderBottomWidth: 1,
                }} />
                <Text style={{ fontSize: 18, fontStyle: 'italic', color: '#ff9797'}}>{this.timeConverter(this.state.time)}</Text>
                <Text style={{ fontSize: 18,}}>{this.state.content}</Text>
                <View
                    style={{
                        marginTop: 20, 
                        marginBottom: 20,
                        borderBottomColor: '#d2d2d2',
                        borderBottomWidth: 1,
                    }} />
                <Text style={{ fontSize: 20, fontWeight: '600'}}>Tags</Text>
                <View style={{
                    marginTop: 10, 
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }} >
                    { this.state.tags.map((tag, i) => {
                        return(
                            <View key={i} style={{ borderRadius: 15, backgroundColor: colorpallete[i%colorpallete.length], alignItems: 'center', height: 30, justifyContent: 'center',  margin: 5, padding: 10}}>
                                <Text style={{fontSize: 18, fontWeight: '600'}}>#{tag}</Text>
                            </View>
                        );
                    })}
                </View>
              </View>
            </ParallaxScrollView>
            </View>
        ); 
    }
}