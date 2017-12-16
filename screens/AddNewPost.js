import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback, 
    Keyboard,
} from 'react-native';
import { Constants, ImagePicker } from 'expo';
import { firebaseApp } from '../FirebaseConfig';
import CustomButton from '../components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const colorpallete = [ '#ff6363', '#ff7474', '#ff8585', '#ff9797', '#ffa8a8', '#ffb9b9', '#ffcbcb',];

const SCREEN_LABEL = 'Add New Post';
const TITLE = 'A short title here';
export default class AddNewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            uid: '', 
            username: '', 
            feature_image: null, 
            description: '',
            content: '',
            tag: '',
            tags: [],
        };
    }
    // static navigationOptions = {
    //   header: null
    // }

    writeNewPost() {
        let d = new Date();
        let n = (d.getTime() / 1000).toFixed();
        
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user != null) {
                this.setState({
                    uid: user.uid,
                });
                
                var tags = this.state.tags;
                var postTags = {};
                for ( var i = 0; i < this.state.tags.length; i ++) {
                    postTags = Object.assign( { [i]: tags[i] }, postTags);
                }

                // A post entry.
                var postData = {
                  userId: this.state.uid,
                  //author: this.state.username,
                  title: this.state.title,
                  content: this.state.content,
                  description: this.state.description,
                  tags: postTags,
                  //featureImage
                  //address: '',
                  categoryId: 0,
                  time: n,
                  //
                };

                // Get a key for a new Post.
                var newPostKey = firebaseApp.database().ref().child('posts').push().key;
                
                let numOfPosts = 0;
                firebaseApp.database().ref('users/' + user.uid).child('posts').on("value", (snap) => {
                    numOfPosts = snap.numChildren();
                });
                
                // Write the new post's data simultaneously in the posts list and the user's post list.
                var updates = {};
                updates['/posts/' + newPostKey] = postData;
                updates['/users/' + user.uid + '/posts/' + numOfPosts] = newPostKey;

                this.setState({
                    // goBack
                });

                return firebaseApp.database().ref().update(updates);
            }
            else {
              console.log('chưa đăng nhập');
            }
          });
      }

      _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ feature_image: result.uri });
        }
      };

      _renderPlaceHolder() {
        return(
        <TouchableOpacity onPress={this._pickImage}>
        { this.state.feature_image == null ?
          <View style={{
            margin: 20,
            borderWidth: 2,
            borderColor: '#999',
            borderStyle: 'dashed',
            borderRadius: 10,
            width: window.width - 40,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
          }}>
                <Image source={require('../assets/icons/camera.png')} style={{width: 40, height: 40, tintColor: '#999'}} resizeMode='cover' />
                <Text style={{fontSize: 20, color: '#999'}}> Add feature image</Text>
          </View>
            : 
        <Image source={{ uri: this.state.feature_image }} style={{ width: window.width, height: 240}} resizeMode='cover' />}
        </TouchableOpacity>
        );
      }

    render() {
        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView>
            <View style={{ flex: 1, }}>
                {/*<View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row'}}>
                    <TouchableOpacity onPress={this.props.onCancelPress}>
                        <Text style={{ fontSize: 20, color: '#000', marginBottom: 10, }}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 10, }}>New Post</Text>
                    <TouchableOpacity onPress={()=>{}}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FF5252', marginBottom: 10, }}>Share</Text>
                    </TouchableOpacity>
                </View>*/}
                { this._renderPlaceHolder() }
                <View style={{backgroundColor: '#fff', padding: 20}} >
                    <TextInput
                        placeholder={TITLE}
                        placeholderTextColor={'#ffdcdc'}
                      //ref={(textinput) => { this.textInput = textinput; }}
                      onChangeText={(title) => {
                            this.setState({
                                title,
                            })
                        }}
                      value={this.state.title}
                      //editable = {true}
                      maxLength = {40}
                      style={{color: '#FF5252', fontWeight: 'bold', fontSize: 28, marginBottom: 10}}
                    />
                  <TextInput
                    placeholder={'Write your description here...'}
                    placeholderTextColor={'#999'}
                    maxLength = {100}
                    //ref={(textinput) => { this.textInput = textinput; }}
                    onChangeText={(description) => {
                          this.setState({
                            description,
                          })
                      }}
                    value={this.state.description}
                    style={{color: '#000', fontSize: 18, fontStyle: 'italic', marginBottom: 10}}
                  />
                  <TextInput
                    placeholder={'Write your full story here...'}
                    placeholderTextColor={'#999'}
                    multiline={true}
                    //ref={(textinput) => { this.textInput = textinput; }}
                    onChangeText={(content) => {
                        this.setState({
                            content,
                        })
                    }}
                    value={this.state.content}
                    style={{color: '#000', fontSize: 18, height: 200, marginBottom: 10, }}
                    maxHeight={200}
                    />
                    <ScrollView 
                        horizontal={true}
                        contentContainerStyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        style={{
                            width: window.width,
                            height: 50,
                        }}>
                        { this.state.tags.map((tag, i) => {
                            return(
                                <View key={i} style={{ borderRadius: 20, backgroundColor: colorpallete[i%colorpallete.length], flexDirection: 'row', alignItems: 'center', height: 40, justifyContent: 'center',  margin: 5, padding: 10}}>
                                    <Text style={{fontSize: 18}}>#{tag} </Text>
                                </View>
                            );
                        })} 
                        { (this.state.tags && this.state.tags.length > 0) ? 
                        <TouchableOpacity onPress={() => {
                            let tempArr = this.state.tags;
                            tempArr.pop();
                            this.setState({
                                tags: tempArr
                            });
                        }}>
                            <Ionicons name={'ios-backspace-outline'} size={40} color={'#FF5252'} />
                        </TouchableOpacity> : null }
                    </ScrollView>
                    <TextInput
                        placeholder={'Write tags here. Tags separated by comma.'}
                        placeholderTextColor={'#999'}
                        //ref={(textinput) => { this.textInput = textinput; }}
                        onChangeText={(tag) => {
                            if(tag.charAt(tag.length - 1) === ',') {
                                let tempTag = tag.substring(0, tag.length - 1);
                                let tempArr = this.state.tags;
                                tempArr.push(tempTag);
                                this.setState({
                                    tags: tempArr,
                                    tag: '',
                                })
                            } else {
                                this.setState({
                                    tag,
                                })
                            }
                        }} 
                        value={this.state.tag}
                        style={{color: '#000', fontSize: 16, marginBottom: 10}}
                        onSubmitEditing={() => {
                            if(this.state.tag != '') {
                                let tempArr = this.state.tags;
                                tempArr.push(this.state.tag)
                                this.setState({
                                    tags: tempArr,
                                    tag: ''
                                })
                            }
                        }}
                    />
                    </View>
                <View style={{ flexDirection:'row', justifyContent: 'space-around' }}>
                    <CustomButton text={'Cancel'} borderColor={'#FF5252'} borderWidth={2} color={'#FF5252'} fontSize={18} width={150} height={50} onPress={this.props.onCancelPress}/>
                    <CustomButton text={'Next'} backgroundColor={'#FF5252'} borderWidth={0} color={'#fff'} fontSize={18} width={150} height={50} onPress={() => {
                        this.writeNewPost();
                        this.props.onCancelPress();
                    }}/>
                </View>
            </View>
            </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        );
    }
}