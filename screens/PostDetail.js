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
    ListView,
    KeyboardAvoidingView
} from 'react-native';
import { Constants } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { firebaseApp } from '../FirebaseConfig';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { RkText, RkTextInput, RkTheme } from 'react-native-ui-kitten';
import CommentItem from '../components/CommentItem';

const window = Dimensions.get('window');
const STICKY_HEADER_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 300;
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const colorpallete = ['#ff6363', '#ff7474', '#ff8585', '#ff9797', '#ffa8a8', '#ffb9b9', '#ffcbcb',];

export default class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            comments: ds.cloneWithRows([]),
            userId: 'User ID',
            username: 'User Name',
            bio: '',
            profile_picture: 'http://www.theatricalrights.com/wp-content/themes/trw/assets/images/default-user.png',
            postId: 'Post ID',
            title: 'Title',
            featuredImage: 'http://drpattydental.com/wp-content/uploads/2017/05/placeholder.png',
            content: 'Nothing.',
            address: '',
            categoryId: -1,
            category: 'Unknown',
            placeId: '',
            description: '',
            images: [],
            tags: ['travel', 'app', 'outdoor', 'quẩy', 'bôn', 'lành', 'ahihi', 'tag nè', 'app tuyệt vời'],
            loves: 0,
            time: 1511978923,
            whoLoves: [],
            liked: false,
            customStyleIndex: 0,
            followed: false,
            isMine: false,
        };
    }

    static navigationOptions = {
        header: null,
    }

    handleCustomIndexSelect = (index) => {
        this.setState({
            ...this.state,
            customStyleIndex: index,
        });
    }

    componentDidMount() {
        //const { params } = this.props.navigation.state;

        this.listenForItems();

        // let postRef = firebaseApp.database().ref('posts/' + params.postID);
        // postRef.on('value', snap => {
        //     this.setState({
        //         userId: snap.val().userId,
        //         postId: snap.key,
        //         title: snap.val().title,
        //         featuredImage: snap.val().featuredImage,
        //         content: snap.val().content,
        //         description: snap.val().description,
        //         loves: snap.val().whoLoves.length,
        //         time: snap.val().time,
        //         tags: snap.val().tags,
        //     });

        //     firebaseApp.database().ref('users/' + snap.val().userId).on("value", (userSnap) => {
        //         this.setState({
        //             profile_picture: userSnap.val().profile_picture,
        //             username: userSnap.val().username,
        //             bio: userSnap.val().bio,
        //         });
        //     });

        // });

        // firebaseApp.auth().onAuthStateChanged((user) => {
        //     if (user != null) {
        //         var userRef = firebaseApp.database().ref('users/' + user.uid);
        //         userRef.on('value', snap => {
        //             this.setState({
        //                 liked_posts: snap.val().liked_posts
        //             });
        //         }); 
        //     }
        // });
    }

    listenForItems() {
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
                time: snap.val().time,
                tags: snap.val().tags,
                placeId: snap.val().placeId,
                categoryId: snap.val().categoryId,
                address: snap.val().address,
                whoLoves: snap.val().whoLoves ? snap.val().whoLoves : [],
                loves: snap.val().whoLoves ? snap.val().whoLoves.length : 0,
            });

            // if(snap.val().whoLoves) {
            //     this.setState({
            //         whoLoves: snap.val().whoLoves,
            //         loves: snap.val().whoLoves.length,
            //     });
            // }

            if (snap.val().comments) {
                var comments = [];
                snap.val().comments.map((cmt, i) => {
                    comments.push({
                        username: cmt.user.name,
                        profile_photo_url: cmt.user.profile_photo_url,
                        createdAt: cmt.createdAt,
                        text: cmt.text,
                    });
                });

                this.setState({
                    comments: ds.cloneWithRows(comments),
                });
            }

            firebaseApp.database().ref('users/' + snap.val().userId).on("value", (userSnap) => {
                this.setState({
                    profile_picture: userSnap.val().profile_picture,
                    username: userSnap.val().username,
                    bio: userSnap.val().bio,
                });
            });
        });

        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user != null) {
                if (this.state.userId === user.uid) {
                    this.setState({
                        isMine: true
                    });
                }
                else {
                    var userRef = firebaseApp.database().ref('users/' + user.uid);
                    userRef.on('value', snap => {
                        let following = snap.val().following ? snap.val().following : [];
                        if (following != []) {
                            following.map((u, index) => {
                                if (u === this.state.userId) {
                                    this.setState({
                                        followed: true
                                    });
                                } else if (u === user.uid) {
                                    this.setState({
                                        isMine: true
                                    });
                                }
                            });
                        }

                        let liked_posts = snap.val().liked_posts ? snap.val().liked_posts : [];
                        if (liked_posts != []) {
                            liked_posts.map((post, index) => {
                                if (post === params.postID) {
                                    this.setState({
                                        liked: true
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    }

    timeConverter = (timestamp) => {
        let date = new Date(timestamp * 1000),
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let year = date.getFullYear(),
            month = months[date.getMonth()],
            day = date.getDate();
        let hours = date.getHours(),
            minutes = "0" + date.getMinutes(),
            seconds = "0" + date.getSeconds();
        if (hours == 0)
            return day + '-' + month + '-' + year + ' ' + 12 + ':' + minutes + ':' + seconds.substr(-2) + ' AM';
        else if (hours == 12)
            return day + '-' + month + '-' + year + ' ' + 12 + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' PM';
        else if (hours < 12)
            return day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds.substr(-2) + ' AM';
        else
            return day + '-' + month + '-' + year + ' ' + (hours - 12) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' PM';
    }

    _onLikePress() {
        const { params } = this.props.navigation.state;

        if (this.state.liked) {
            console.log('Unliked');
            //TODO: sau khi xoá postID khỏi liked_posts và user.id khỏi whoLoves => sắp xếp lại 2 mảng (id từ 0 -> length mới) !!
            firebaseApp.auth().onAuthStateChanged((user) => {
                if (user != null) {
                    //console.log('user id: ' + user.uid);
                    //var updates = {};
                    let liked_posts = [];
                    let targetPost = -1;
                    let liked_postsRef = firebaseApp.database().ref('users/' + user.uid).child('liked_posts');
                    liked_postsRef.on("value", (snap) => {
                        liked_posts = snap.val();
                    });

                    liked_posts.map((_post, index) => {
                        if (_post === params.postID) {
                            targetPost = index;
                        }
                    });
                    if (targetPost >= 0) {
                        liked_posts.splice(targetPost, 1);
                        liked_postsRef.set(liked_posts);
                    }

                    let whoLoves = [];
                    let targetUid = -1;
                    let whoLovesRef = firebaseApp.database().ref('posts/' + params.postID).child('whoLoves');
                    whoLovesRef.on("value", (snap) => {
                        whoLoves = snap.val();
                        //console.log('whoLoves before removing: ' + whoLoves);
                    });
                    whoLoves.map((id, index) => {
                        if (id === user.uid) {
                            targetUid = index;
                        }
                    });
                    //console.log('targetUid: ' + targetUid);
                    if (targetUid >= 0) {
                        whoLoves.splice(targetUid, 1);
                        whoLovesRef.set(whoLoves);
                        // console.log('whoLoves after removing: ' + whoLoves);
                    }
                    this.setState({
                        liked: false,
                    });
                }
            });
        }
        else {
            console.log('Liked');
            firebaseApp.auth().onAuthStateChanged((user) => {
                if (user != null) {
                    var updates = {};
                    // update trong user info
                    let numOfLikedPosts = 0;
                    firebaseApp.database().ref('users/' + user.uid).child('liked_posts').on("value", (snap) => {
                        numOfLikedPosts = snap.numChildren();
                    });
                    updates['/users/' + user.uid + '/liked_posts/' + numOfLikedPosts] = params.postID;

                    // update trong posts
                    let numOfLovers = this.state.loves;
                    updates['/posts/' + params.postID + '/whoLoves/' + numOfLovers] = user.uid;

                    firebaseApp.database().ref().update(updates);

                    this.setState({
                        liked: true,
                    });
                }
            });
        }
    }

    _onFollowPress() {
        // const { params } = this.props.navigation.state;

        if (this.state.followed) {
            console.log('UnFollowed');
            // TODO: sau khi xoá postID khỏi liked_posts và user.id khỏi whoLoves => sắp xếp lại 2 mảng (id từ 0 -> length mới) !!
            firebaseApp.auth().onAuthStateChanged((user) => {
                if (user != null) {
                    //console.log('user id: ' + user.uid);
                    //var updates = {};
                    let following = [];
                    let target1 = -1;
                    let followingRef = firebaseApp.database().ref('users/' + user.uid).child('following');
                    followingRef.on("value", (snap) => {
                        following = snap.val();
                    });

                    following.map((_id, index) => {
                        if (_id === this.state.userId) {
                            target1 = index;
                        }
                    });
                    if (target1 >= 0) {
                        following.splice(target1, 1);
                        followingRef.set(following);
                    }

                    let followers = [];
                    let target2 = -1;
                    let followersRef = firebaseApp.database().ref('users/' + this.state.userId).child('followers');
                    followersRef.on("value", (snap) => {
                        followers = snap.val();
                        //console.log('whoLoves before removing: ' + followers);
                    });
                    followers.map((id, index) => {
                        if (id === user.uid) {
                            target2 = index;
                        }
                    });
                    if (target2 >= 0) {
                        followers.splice(target2, 1);
                        followersRef.set(followers);
                        // console.log('whoLoves after removing: ' + whoLoves);
                    }
                    this.setState({
                        followed: false,
                    });
                }
            });
        }
        else {
            console.log('Followed');
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
                    updates['/users/' + user.uid + '/following/' + numOfFollowing] = this.state.userId;

                    // update trong posts
                    let numOfFollowers = 0;
                    let followersRef = firebaseApp.database().ref('users/' + this.state.userId).child('followers')
                    if(followersRef) {
                        followersRef.on("value", (snap) => {
                            numOfFollowers = snap.numChildren();
                        });
                    }
                    updates['/users/' + this.state.userId + '/followers/' + numOfFollowers] = user.uid;

                    firebaseApp.database().ref().update(updates);

                    this.setState({
                        followed: true,
                    });
                }
            });
        }
    }

    _renderAddress = () => {
        const { navigate } = this.props.navigation;
        if (this.state.address != '') {
            return (
                <View>
                    <View
                        style={{
                            marginTop: 20,
                            marginBottom: 20,
                            borderBottomColor: '#d2d2d2',
                            borderBottomWidth: 1,
                        }} />
                    <Text style={{ fontSize: 20, fontWeight: '600' }}>Address</Text>
                    <Text style={{ fontSize: 18 }}>{this.state.address}</Text>
                    {this.state.placeId != '' ?
                        <TouchableOpacity onPress={() => { navigate('PlaceDetail', { placeID: this.state.placeId }); }}>
                            <Text style={{ fontSize: 18, color: '#ff6363' }}>Guide me</Text>
                        </TouchableOpacity>
                        : null}
                </View>
            );
        }
        return null;
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
                <ParallaxScrollView
                    ref={(scroll) => { this.scrollview = scroll; }}
                    backgroundColor="white"
                    stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                    parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                    backgroundSpeed={10}
                    renderBackground={() => (
                        <View>
                            <Image source={{
                                uri: this.state.featuredImage,
                                width: window.width,
                                height: PARALLAX_HEADER_HEIGHT
                            }} />
                            <View style={{
                                position: 'absolute',
                                top: 0,
                                width: window.width,
                                backgroundColor: 'transparent',
                                height: PARALLAX_HEADER_HEIGHT
                            }} />
                        </View>
                    )}
                    renderForeground={() => (
                        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingTop: Constants.statusBarHeight, }}>
                            <View
                                style={{ width: window.width, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', }}>
                                <TouchableOpacity
                                    onPress={() => goBack()}>
                                    <View style={{ flexDirection: 'row', marginTop: 30, margin: 20 }}>
                                        <Ionicons name={'ios-arrow-back'} size={28} color={'#fff'} />
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', }}> Back</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: 'white' }}>{this.state.title}</Text>
                        </View>
                    )}
                    renderStickyHeader={() => (
                        <View key="sticky-header" style={{ height: STICKY_HEADER_HEIGHT, alignItems: 'center', justifyContent: 'flex-end', }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 10 }}
                                onPress={() => this.scrollview.scrollTo({ x: 0, y: 0 })}>{this.state.username}'s Story</Text>
                        </View>
                    )}>
                    <View style={{ flex: 1, padding: 20, paddingBottom: 60 }}>
                        <SegmentedControlTab
                            values={['Post', 'Comments']}
                            selectedIndex={this.state.customStyleIndex}
                            onTabPress={this.handleCustomIndexSelect}
                            borderRadius={0}
                            tabsContainerStyle={{ height: 60, backgroundColor: '#fff', marginBottom: 20 }}
                            tabStyle={{ backgroundColor: '#fff', borderWidth: 1, borderColor: 'transparent', }}
                            activeTabStyle={{ backgroundColor: '#fff', borderWidth: 1, borderColor: 'transparent', borderBottomColor: '#FF5252' }}
                            tabTextStyle={{ color: '#999', fontWeight: 'bold', fontSize: 18 }}
                            activeTabTextStyle={{ color: '#FF5252', fontWeight: 'bold', fontSize: 18 }} />
                        {this.state.customStyleIndex === 0 &&
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 10, textAlign: 'center' }}>{this.state.description}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', padding: 10 }}>
                                    <TouchableOpacity onPress={() => this._onLikePress()}>
                                        <Text style={{ fontSize: 20, color: 'black', alignItems: 'center', }}><Ionicons name={this.state.liked ? 'md-heart' : 'md-heart-outline'} style={{ color: '#FF5252' }} size={24} /> {this.state.loves}</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 20, color: 'black', }}>something</Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 10,
                                        marginRight: 10,
                                        borderBottomColor: '#d2d2d2',
                                        borderBottomWidth: 1,
                                    }} />
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                        <Image style={{ borderRadius: 30, width: 60, height: 60 }}
                                            source={{ uri: this.state.profile_picture }}
                                        />
                                    </View>
                                    <View style={{ flex: 2, justifyContent: 'space-around', alignItems: 'flex-start', padding: 10 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{this.state.username}</Text>
                                        <Text style={{ fontSize: 12, fontStyle: 'italic', color: '#ff9797' }}>{this.state.bio}</Text>
                                    </View>
                                    <TouchableOpacity 
                                        activeOpacity={0.8}
                                        onPress={() => this._onFollowPress()}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            {!this.state.isMine ? <View style={{ width: 80, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 2, backgroundColor: (this.state.followed ? '#FF5252' : '#fff'), borderColor: '#FF5252', padding: 5 }}><Text style={{ backgroundColor: 'transparent', color: (this.state.followed ? '#fff' : '#FF5252'), fontSize: 14 }}>{this.state.followed ? 'Following' : 'Follow'}</Text></View> : <View></View>}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        marginTop: 20,
                                        marginBottom: 20,
                                        borderBottomColor: '#d2d2d2',
                                        borderBottomWidth: 1,
                                    }} />
                                <Text style={{ fontSize: 18, fontStyle: 'italic', color: '#ff9797' }}>{this.timeConverter(this.state.time)}</Text>
                                <Text style={{ fontSize: 18, }}>{this.state.content}</Text>
                                <View
                                    style={{
                                        marginTop: 20,
                                        marginBottom: 20,
                                        borderBottomColor: '#d2d2d2',
                                        borderBottomWidth: 1,
                                    }} />
                                <Text style={{ fontSize: 20, fontWeight: '600' }}>Tags</Text>
                                <View style={{
                                    marginTop: 10,
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                }} >
                                    {this.state.tags.map((tag, i) => {
                                        return (
                                            <View key={i} style={{ borderRadius: 15, backgroundColor: colorpallete[i % colorpallete.length], alignItems: 'center', height: 30, justifyContent: 'center', margin: 5, padding: 10 }}>
                                                <Text style={{ fontSize: 18, fontWeight: '600' }}>#{tag}</Text>
                                            </View>
                                        );
                                    })}
                                </View>
                                {this._renderAddress()}
                            </View>}

                        {this.state.customStyleIndex === 1 &&
                            <View>
                                {this.state.comments.getRowCount() > 0 ?
                                    <ListView
                                        dataSource={this.state.comments}
                                        //renderRow={rowData => this._renderComment(rowData)}
                                        renderRow={rowData => 
                                            <CommentItem 
                                                image={rowData.profile_photo_url}
                                                createdAt={rowData.createdAt}
                                                username={rowData.username}
                                                text={rowData.text}/>
                                        }
                                    />
                                    : <Text style={{ fontSize: 20, color: '#999', fontWeight: 'bold' }}>No Comment</Text>
                                }
                            </View>}
                    </View>
                </ParallaxScrollView>

                <KeyboardAvoidingView behavior={'position'}>
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        paddingRight: 10,
                        paddingLeft: 10,
                        flex: window.width,
                        height: 60,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <RkTextInput rkType='cmtbox'
                            style={{
                                paddingRight: 10,
                                paddingLeft: 10,
                                flex: 1,
                            }}
                            clearButtonMode='always'
                            ref={input => {
                                this.textInput = input;
                            }}
                            returnKeyType='send'
                            placeholder="Write a comment..."
                            value={this.state.inputValue}
                            onChangeText={this._handleTextChange}
                            onSubmitEditing={this._handleSubmitText} />
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }

    _handleSubmitText = () => {
        const { params } = this.props.navigation.state;
        let d = new Date();
        let n = (d.getTime() / 1000).toFixed();
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user != null) {
                let userRef = firebaseApp.database().ref('users/' + user.uid);
                let profile_picture = '', name = '';
                userRef.on('value', snap => {
                    profile_picture = snap.val().profile_picture;
                    name = snap.val().username;
                });

                let commentsRef = firebaseApp.database().ref('posts/' + params.postID + '/comments/');

                let numOfCmts = 0;
                if (commentsRef) {
                    commentsRef.on("value", (snap) => {
                        numOfCmts = snap.numChildren();
                    });
                }
                var updates = {};
                updates['/posts/' + params.postID + '/comments/' + numOfCmts] = {
                    createdAt: n,
                    text: this.state.inputValue,
                    user: {
                        _id: user.uid,
                        name: name,
                        profile_photo_url: profile_picture
                    }
                };

                firebaseApp.database().ref().update(updates);

                this.setState({
                    inputValue: ''
                });
            }
        });
    }

    _handleTextChange = inputValue => {
        this.setState({ inputValue });
    };

    _renderComment(rowData) {
        return (
            <View style={{ padding: 10 }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        padding: 10,
                    }}>
                    <View style={{
                        height: 60,
                        width: 60,
                        justifyContent: 'center',
                    }}>
                        <Image
                            style={{ borderRadius: 60 / 2, width: 60, height: 60 }}
                            resizeMode="cover"
                            source={{ uri: rowData.profile_photo_url }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            marginLeft: 20,
                            flexDirection: 'column',
                            justifyContent: 'space-around'
                        }}>
                        <Text
                            style={{ fontSize: 20 }}
                            ellipsizeMode="clip"
                            numberOfLines={1}>
                            {rowData.username}
                        </Text>
                        <Text style={{ fontSize: 18, color: '#D3D3D3' }}
                            numberOfLines={1}>{this.timeConverter(rowData.createdAt)}</Text>
                    </View>

                </View>
                <Text style={{ fontSize: 16, }}
                    numberOfLines={5}>
                    {rowData.text}
                </Text>
            </View>
        );
    }
}

RkTheme.setType('RkTextInput', 'cmtbox', {
    height: 40,
    borderRadius: 50,
    underlineColor: '#0000',
    backgroundColor: '#f5f4f2',
    width: window.width - 20
}); 