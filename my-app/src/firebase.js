import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyA9puAlYkHJUKKSTSNVpNAxJP1KTsrmvN4",
    authDomain: "telegram-clone-b774d.firebaseapp.com",
    projectId: "telegram-clone-b774d",
    storageBucket: "telegram-clone-b774d.appspot.com",
    messagingSenderId: "725223290779",
    appId: "1:725223290779:web:85a929ba78eecac862533e"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth=firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;