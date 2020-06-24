import * as firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDF3ktOoNVUi00HQWc-RTxcf6Ml0G45pec",
    authDomain: "hopeful-dolphin-280410.firebaseapp.com",
    databaseURL: "https://hopeful-dolphin-280410.firebaseio.com",
    projectId: "hopeful-dolphin-280410",
    storageBucket: "hopeful-dolphin-280410.appspot.com",
    messagingSenderId: "178553042426",
    appId: "1:178553042426:web:cd66e6dbabdfe28f242043"
}

firebase.initializeApp(config)

export const firebaseAuth = firebase.auth

export default firebase;
