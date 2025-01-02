import firebase from 'firebase/app'
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

if (!firebase.getApps().length) {
    firebase.initializeApp(firebaseConfig);
}
else {
    firebase.getApp();
}