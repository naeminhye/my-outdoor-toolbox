import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SlidingUpPanel from 'rn-sliding-up-panel';
import ShortInfo from '../components/ShortInfo';
import { firebaseApp } from '../FirebaseConfig';

import PropTypes from "prop-types";
var { width, height } = Dimensions.get('window');

export default class MessageSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panelVisible: false,
      users: [],
    };
    //this._onFollowPress = this._onFollowPress.bind(this);
  }

  componentDidMount() {
    var users = [];
    this.props.list.forEach(element => {
      let followed = false;
      firebaseApp.auth().onAuthStateChanged((user) => {
        if (user != null) {
          firebaseApp.database().ref('users/' + user.uid).on("value", (snap) => {
            if(snap.val().following) {
              followed = snap.val().following.includes(element);
            }
          });
        }});

      firebaseApp.database().ref('users/' + element).on("value", (userSnap) => {
        users.push({
          profile_picture: userSnap.val().profile_picture,
          username: userSnap.val().username,
          bio: userSnap.val().bio,
          uid: element,
          followed: followed
        })
      });
    });

    this.setState({
      users: users
    });
  }

  // _onFollowPress(u) {
  //   if (u.followed) {
  //       console.log('UnFollowed');
  //       firebaseApp.auth().onAuthStateChanged((user) => {
  //           if (user != null) {
  //               let following = [];
  //               let target1 = -1;
  //               let followingRef = firebaseApp.database().ref('users/' + user.uid).child('following');
  //               followingRef.on("value", (snap) => {
  //                   following = snap.val();
  //               });

  //               following.map((_id, index) => {
  //                   if (_id === u.uid) {
  //                       target1 = index;
  //                   }
  //               });
  //               if (target1 >= 0) {
  //                   following.splice(target1, 1);
  //                   followingRef.set(following);
  //               }

  //               let followers = [];
  //               let target2 = -1;
  //               let followersRef = firebaseApp.database().ref('users/' + u.uid).child('followers');
  //               followersRef.on("value", (snap) => {
  //                   followers = snap.val();
  //               });
  //               followers.map((id, index) => {
  //                   if (id === user.uid) {
  //                       target2 = index;
  //                   }
  //               });
  //               if (target2 >= 0) {
  //                   followers.splice(target2, 1);
  //                   followersRef.set(followers);
  //               }
  //               u.followed = false;
  //           }
  //       });
  //   }
  //   else {
  //       console.log('Followed');
  //       firebaseApp.auth().onAuthStateChanged((user) => {
  //           if (user != null) {
  //               var updates = {};
                
  //               let numOfFollowing = 0;
  //               let followingRef = firebaseApp.database().ref('users/' + user.uid).child('following')
  //               if(followingRef) {
  //                   followingRef.on("value", (snap) => {
  //                       numOfFollowing = snap.numChildren();
  //                   });
  //               }
  //               updates['/users/' + user.uid + '/following/' + numOfFollowing] = u.uid;

  //               // update trong posts
  //               let numOfFollowers = 0;
  //               let followersRef = firebaseApp.database().ref('users/' + u.uid).child('followers')
  //               if(followersRef) {
  //                   followersRef.on("value", (snap) => {
  //                       numOfFollowers = snap.numChildren();
  //                   });
  //               }
  //               updates['/users/' + u.uid + '/followers/' + numOfFollowers] = user.uid;

  //               firebaseApp.database().ref().update(updates);
  //               u.followed = true;
  //           }
  //       });
  //   }
  // }

  render() {
    const { navigate } = this.props.navigation;
    let { closeDrawer } = this.props;
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: "#fff"
        }}
      >
        <View
          style={{
            height: 40,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row"
          }}
        >
          <TouchableOpacity onPress={closeDrawer}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name={"ios-arrow-back"} size={28} />
              <Text style={{ fontSize: 20 }}> Back</Text>
            </View>
          </TouchableOpacity>

          <Text style={{ fontSize: 20, fontWeight: "bold", margin: 10 }}>
            Details
          </Text>
          <View />
        </View>
        <View style={{ flex: 1, backgroundColor: "#fff", justifyContent: 'flex-start', alignItems: 'center' }}>
        {this.state.users.map((u, index) =>
          <ShortInfo 
            key={index}
            //onFollowPress={this._onFollowPress(u)}
            profile_picture={u.profile_picture}
            username={u.username}
            bio={u.bio}
            isMine={false}
            followed={u.followed}
            onPress={() => navigate('OtherProfile', { userID: u.uid })} />
        )}
          {/*<TouchableOpacity onPress={() => this.setState({panelVisible: true})}>
            <Text>Change Color</Text>
          </TouchableOpacity>*/}
        </View>
        <SlidingUpPanel
          allowDragging={false}
          ref={c => this._panel = c}
          visible={this.state.panelVisible}
          onRequestClose={() => this.setState({panelVisible: false})}>
          <View style={{
            flex: 1,
            // height: height / 2,
            marginTop: height / 2,
            backgroundColor: '#fff',
            justifyContent: 'center', alignItems: 'center' 
          }}>
          <TouchableOpacity onPress={() => this.setState({panelVisible: false})}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          </View>
        </SlidingUpPanel>
      </View>
    );
  }
}

MessageSetting.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
  list: PropTypes.array
};
