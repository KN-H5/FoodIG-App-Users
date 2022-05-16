import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDBnJoi0ZzVOAa7hrE3QSiqvNtNWH36PWE",
//   authDomain: "food-g-app.firebaseapp.com",
//   projectId: "food-g-app",
//   storageBucket: "food-g-app.appspot.com",
//   messagingSenderId: "612023342323",
//   appId: "1:612023342323:web:b415037e1bf07dbc591386",
//   measurementId: "G-Q29BM70CC8",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDVChxAmHquiSYpW5QikQYd-G5zF4Adt8k",
  authDomain: "food-database-8b684.firebaseapp.com",
  projectId: "food-database-8b684",
  storageBucket: "food-database-8b684.appspot.com",
  messagingSenderId: "91125374790",
  appId: "1:91125374790:web:118090b76c0baa27d38f47",
  measurementId: "G-D7HX2FZFFM"
};


!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export const realtimeDB =  firebase.database;

auth.setPersistence("local");

export default firebase;
export { googleProvider, facebookProvider, auth, db  };
