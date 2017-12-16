import * as firebase from 'firebase';

class Backend {
    uid = '';
    database = null;
    postRef = null;

    constructor() {
        firebase.initializeApp({
            apiKey: "AIzaSyDuEoTFsDCQjE7ZYqGZEL87AmwQ_9ai4eE",
            authDomain: "my-outdoor-toolbox.firebaseapp.com",
            databaseURL: "https://my-outdoor-toolbox.firebaseio.com",
            projectId: "my-outdoor-toolbox",
            storageBucket: "my-outdoor-toolbox.appspot.com",
            messagingSenderId: "824098795668"
          });
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setUid(user.uid);
                //this.database = firebaseApp.database();
            } else {
                console.log('user bị null');
            }
        });
    }

    setUid(uid) {
        this.uid = uid;
    }

    getUid() {
        return this.uid;
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