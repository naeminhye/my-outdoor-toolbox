import * as firebase from 'firebase';
// 4.5.2
var config = {
   apiKey: "AIzaSyDuEoTFsDCQjE7ZYqGZEL87AmwQ_9ai4eE",
   authDomain: "my-outdoor-toolbox.firebaseapp.com",
   databaseURL: "https://my-outdoor-toolbox.firebaseio.com",
   projectId: "my-outdoor-toolbox",
   storageBucket: "my-outdoor-toolbox.appspot.com",
   messagingSenderId: "824098795668"
 };
export const firebaseApp = firebase.initializeApp(config);