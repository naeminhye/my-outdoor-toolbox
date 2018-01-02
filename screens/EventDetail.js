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
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { firebaseApp } from '../FirebaseConfig';
import { RkText, RkTextInput, RkTheme } from 'react-native-ui-kitten';
const window = Dimensions.get('window');
const STICKY_HEADER_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 300;
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
import Timeline from 'react-native-timeline-listview'
import CommentItem from '../components/CommentItem';
export default class EventDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'User Name',
            bio: '',
            profile_picture: 'http://www.theatricalrights.com/wp-content/themes/trw/assets/images/default-user.png',
            featuredImage: "http://youth.buh.edu.vn/wp-content/uploads/2014/12/%E1%BA%A2NH-TO%C3%80N-S%C3%82N-B%C3%93NG.jpg",
            title: '',
            description: '',
            address: '',
            placeId: '',
            userId: '',
            images: [],
            comments: ds.cloneWithRows([]),
            fee: 0,
            currency: "VNĐ",
            itinerary: [],
            participants: [],
            participantCount: 0,
            customStyleIndex: 0,
            content: '',
            time: 1514734131,
            inputValue: '',
            isMine: false,
            followed: false,
            itinerary: [],
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
        const { params } = this.props.navigation.state;
        let postRef = firebaseApp.database().ref('events/' + params.eventID);
        postRef.on('value', snap => {
            this.setState({
                userId: snap.val().userId,
                eventId: snap.key,
                title: snap.val().title,
                featuredImage: snap.val().featuredImage,
                description: snap.val().description,
                placeId: snap.val().placeId,
                address: snap.val().address,
                notes: snap.val().notes,
                participants: snap.val().participants ? snap.val().participants : [],
                participantCount: snap.val().participants ? snap.val().participants.length : 0,
                fee: snap.val().fee,
                content: snap.val().content,
                time: snap.val().time,
                fee: snap.val().fee,
                currency: snap.val().currency,
                itinerary: snap.val().itinerary ? snap.val().itinerary : [],
            });

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
                        //let liked_posts = snap.val().liked_posts ? snap.val().liked_posts : [];
                        if (following != []) {
                            following.map((u, index) => {
                                if (u === this.state.userId) {
                                    this.setState({
                                        followed: true
                                    });
                                }
                            });
                        }

                        // if (liked_posts != []) {
                        //     liked_posts.map((post, index) => {
                        //         if (post === params.postID) {
                        //             this.setState({
                        //                 liked: true
                        //             });
                        //         }
                        //     });
                        // }
                    });
                }
            }
        });
    }

    _handleTextChange = inputValue => {
        this.setState({ inputValue });
    };

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

    // _onLikePress() {
    //     const { params } = this.props.navigation.state;

    //     if(this.state.liked) {
    //         console.log('Unliked');
    //         // TODO: sau khi xoá postID khỏi liked_posts và user.id khỏi whoLoves => sắp xếp lại 2 mảng (id từ 0 -> length mới) !!
    //     }
    //     else {
    //         console.log('Liked');

    //         firebaseApp.auth().onAuthStateChanged((user) => {
    //             if (user != null) {
    //                 var updates = {};
    //                 // update trong user info
    //                 let numOfLikedPosts = 0;
    //                 firebaseApp.database().ref('users/' + user.uid).child('liked_posts').on("value", (snap) => {
    //                     numOfLikedPosts = snap.numChildren();
    //                 });
    //                 updates['/users/' + user.uid + '/liked_posts/' + numOfLikedPosts] = params.postID;

    //                 // update trong posts
    //                 let numOfLovers = this.state.loves;
    //                 updates['/posts/' + params.postID + '/whoLoves/' + numOfLovers] = user.uid;

    //                 firebaseApp.database().ref().update(updates);

    //                 this.setState({
    //                     liked: true
    //                 });
    //             }
    //         });
    //     }
    // }

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
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
                                onPress={() => this.scrollview.scrollTo({ x: 0, y: 0 })}>Event</Text>
                        </View>
                    )}>
                    <View style={{ flex: 1, padding: 20, paddingBottom: 60 }}>
                        <SegmentedControlTab
                            values={['About', 'Itinerary', 'Comments']}
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
                                <View
                                    style={{
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        justifyContent: 'space-between',
                                        alignSelf: 'stretch',
                                        flexDirection: 'row',
                                    }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                        Participants: {this.state.participantCount}
                                    </Text>
                                    <Text style={{ fontSize: 16, color: '#FF5252' }}>
                                        Expand <Ionicons name={'ios-arrow-down'} size={16} />
                                    </Text>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                                    <Text style={{ fontSize: 20, color: 'black', }}>Blah blah blah</Text>
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
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        {!this.state.isMine ? <View style={{ width: 80, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 2, backgroundColor: (this.state.followed ? '#FF5252' : '#fff'), borderColor: '#FF5252', padding: 5 }}><Text style={{ backgroundColor: 'transparent', color: (this.state.followed ? '#fff' : '#FF5252'), fontSize: 14 }}>{this.state.followed ? 'Following' : 'Follow'}</Text></View> : <View></View>}
                                    </View>
                                </View>
                                <View
                                    style={{
                                        marginTop: 20,
                                        marginBottom: 20,
                                        borderBottomColor: '#d2d2d2',
                                        borderBottomWidth: 1,
                                    }} />
                                <Text style={{ fontSize: 18, fontStyle: 'italic', color: '#ff9797' }}>{this.timeConverter(this.state.time)}</Text>
                                <Text style={{ fontSize: 18 }}>{this.state.content}</Text>
                                <Text style={{ fontSize: 18 }}><Text style={{ fontWeight: 'bold' }}>Fee: </Text>{this.state.currency} {this.state.fee}</Text>
                                {/*
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
                */}
                                {this._renderAddress()}
                            </View>}

                        {this.state.customStyleIndex === 1 &&
                            <View>
                                {this.state.itinerary.length > 0 ?
                                    <Timeline
                                        style={{ flex: 1 }}
                                        data={this.state.itinerary}
                                        circleSize={10}
                                        circleColor='#ff6363'
                                        lineColor='#ff6363'
                                        timeContainerStyle={{ minWidth: 65, marginTop: -5, borderRadius: 50 }}
                                        timeStyle={{ textAlign: 'center', fontSize: 18, backgroundColor: 'transparent', color: 'black', padding: 5, }}
                                        descriptionStyle={{ color: 'gray' }}
                                        options={{
                                            style: { paddingTop: 5 }
                                        }}
                                        separator={false}
                                        detailContainerStyle={{ marginBottom: 20, padding: 20, backgroundColor: "#f5f4f2", borderRadius: 10, shadowColor: '#000', shadowOffset: { width: -2, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 1, }}
                                    /> : <Text style={{ fontSize: 20, color: '#999', fontWeight: 'bold' }}>No Itinerary</Text>}
                            </View>}

                        {this.state.customStyleIndex === 2 &&
                            <View>
                                {this.state.comments.getRowCount() > 0 ?
                                    <ListView
                                        dataSource={this.state.comments}
                                        // renderRow={rowData => this._renderComment(rowData)}
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

                let commentsRef = firebaseApp.database().ref('events/' + params.eventID + '/comments/');

                let numOfCmts = 0;
                if (commentsRef) {
                    commentsRef.on("value", (snap) => {
                        numOfCmts = snap.numChildren();
                    });
                }
                var updates = {};
                updates['/events/' + params.eventID + '/comments/' + numOfCmts] = {
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