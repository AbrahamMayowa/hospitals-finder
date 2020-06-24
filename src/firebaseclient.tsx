import * as firebase from 'firebase/app';
import 'firebase/auth';

const config = {
///removed on security reason
}

firebase.initializeApp(config)

export const firebaseAuth = firebase.auth

export default firebase;
