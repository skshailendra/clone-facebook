// import * as firebase from "firebase/app";
// import "firebase/storage";
// import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyCgOxQAMak4OhKFoR9vyfNCgDK2sniZoVs",
//   authDomain: "clone-facebook-newsfeed.firebaseapp.com",
//   projectId: "clone-facebook-newsfeed",
//   storageBucket: "clone-facebook-newsfeed.appspot.com",
//   messagingSenderId: "1036060251352",
//   appId: "1:1036060251352:web:6043978ea10f1c9332b3ad",
// };
// firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage();
// const firestore = firebase.firestore();
// const timestamp = firebase.firestore.FieldValue.serverTimestamp;
// export { storage, firestore, timestamp };

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgOxQAMak4OhKFoR9vyfNCgDK2sniZoVs",
  authDomain: "clone-facebook-newsfeed.firebaseapp.com",
  projectId: "clone-facebook-newsfeed",
  storageBucket: "clone-facebook-newsfeed.appspot.com",
  messagingSenderId: "1036060251352",
  appId: "1:1036060251352:web:6043978ea10f1c9332b3ad",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { storage, projectFirestore, timestamp, firebase as default };
