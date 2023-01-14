import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCqISIPYnxx_MsHxDuG2NOMX6xxiyOympY",
  authDomain: "linktr-ee.firebaseapp.com",
  projectId: "linktr-ee",
  storageBucket: "linktr-ee.appspot.com",
  messagingSenderId: "486568368278",
  appId: "1:486568368278:web:f0770dcb8fc37e8febcab7",
  databaseURL: "https://linktr-ee-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = firebase.initializeApp(firebaseConfig);

export const storage = getStorage(app)

export default firebase;