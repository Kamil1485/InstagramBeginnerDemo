// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*
import firebase from "firebase"
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCfOlhzSgS8mtrO0PRRve40p0TS8DSk6ZE",
    authDomain: "instagram-clone-bc5b4.firebaseapp.com",
    projectId: "instagram-clone-bc5b4",
    storageBucket: "instagram-clone-bc5b4.appspot.com",
    messagingSenderId: "414444678289",
    appId: "1:414444678289:web:197d222c76e286a4ebe330",
    measurementId: "G-LE4W0TLK7V"
  });

  const db=firebaseApp.firestore()//database erişmek için
  const auth=firebase.auth();//autentaticon icin //login logout
  const storage=firebase.storage();//upload  fotolar bilgiler databasedeki
  export {db, auth, storage};
  //firabase i projemize yukluyoruz
  //npm i firabase yaz terminale
*/

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
 


// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp( {
  apiKey: "AIzaSyCfOlhzSgS8mtrO0PRRve40p0TS8DSk6ZE",
  authDomain: "instagram-clone-bc5b4.firebaseapp.com",
  projectId: "instagram-clone-bc5b4",
  storageBucket: "instagram-clone-bc5b4.appspot.com",
  messagingSenderId: "414444678289",
  appId: "1:414444678289:web:197d222c76e286a4ebe330",
  measurementId: "G-LE4W0TLK7V"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };