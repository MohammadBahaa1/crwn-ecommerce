import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyBGIPBLPdg7F_rcUyJBXLCmj0CCbIlBZGw",
  authDomain: "react-ecommerce-36dd2.firebaseapp.com",
  databaseURL: "https://react-ecommerce-36dd2.firebaseio.com",
  projectId: "react-ecommerce-36dd2",
  storageBucket: "react-ecommerce-36dd2.appspot.com",
  messagingSenderId: "733961185376",
  appId: "1:733961185376:web:dfb0ae32bacd90661c7b05",
  measurementId: "G-Q1250BC10C"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
