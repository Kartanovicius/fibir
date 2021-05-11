import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBfkFmEcDWOFn6XKAp44CeRHfwIq2-VL5g",
  authDomain: "fibir-420f9.firebaseapp.com",
  projectId: "fibir-420f9",
  storageBucket: "fibir-420f9.appspot.com",
  messagingSenderId: "329258509012",
  appId: "1:329258509012:web:ff08bdecf1a80491a15141"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
