import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../../contexts/authContext";
import { dataContext } from "../../contexts/dataContext";
import firebase from "../../firebase/firebase";
import ChooseUsername from "./ChooseUsername";
import "./Links.css";

function Links() {
  const [isOpen, setIsOpen] = useState(false);

  // getting the states from context
  const { email, uid, displayName, photoURL } = useContext(authContext);
  const { dataCenter, appData } = useContext(dataContext);

  // storing the uid/name/email/photoURL each time the user sign
  useEffect(() => {
    if (uid && email) {
      firebase
        .database()
        .ref(`${localStorage.getItem("this_uid")}/user_info_section_1`)
        .set({
          uid: uid,
          displayName: appData ? appData[0].displayName : displayName,
          bio: appData ? appData[0].bio : "",
          email: email,
          photoURL: appData ? appData[0].photoURL : photoURL,
        });
    }
  }, [email, uid, displayName, photoURL]);

  // UI UI UI UI UI UI UI UI UI UI
  if (dataCenter && dataCenter.length == 2) {
    return (
        <div>
            hi
        </div>
    )
  } else if (dataCenter && dataCenter.length == 1) {
    return <ChooseUsername />;
  } else {
    return "todo: loading background should be gray and divided by two";
  }
}

export default Links;
