import * as firebase from 'firebase';
import { firebaseApp } from './FirebaseConfig';

class Backend {
    uid = null;
    database = null;
    postRef = null;

    constructor() {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setUid(user.uid);
                //this.database = firebaseApp.database();
            } else {
                console.log('user :' + this.uid);
            }
        });
    }

    setUid(uid) {
        this.uid = uid;
    }

    getUid() {
        return this.uid;
    }

    getState() {
        setTimeout(() => {
            firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                this.isLoggedIn = true;
            }
            else {
                this.isLoggedIn = false;
            }
            });
        }, 3000);
    }

    getProfilePicture() {

    }

    loadPosts(callback) {
        this.postRef = firebase.database().ref('post');
        const onReceive = (data) => {
            const message = data.val();
            callback({
            //   _id: data.key,
            //   text: message.text,
            //   createdAt: new Date(message.createdAt),
            //   user: {
            //     _id: message.user._id,
            //     name: message.user.name,
            //   },
            });
          };
          //this.postRef.limitToLast(20).on('child_added', onReceive);
    }
}

export default new Backend();