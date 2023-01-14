import React, { useState } from "react";
import firebase from "firebase/compat/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const authContext = React.createContext();

function AuthContextProvider({ children }) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [uid, setUid] = useState("");

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
  const auth = getAuth(app);

  // google authentication
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setDisplayName(result.user.displayName);
        setEmail(result.user.email);
        setPhotoURL(result.user.photoURL);
        setUid(result.user.uid);

        localStorage.setItem("this_uid", result.user.uid);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // sign out
  const logout = async () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("this_uid");
        window.location.reload();
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <authContext.Provider
      value={{
        email,
        displayName,
        uid,
        photoURL,
        auth,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export { AuthContextProvider, authContext };
