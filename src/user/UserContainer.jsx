import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebase";
import { useLocation } from "react-router-dom";
import User from "./User";
import "./User.css";

function UserContainer() {
  const location = useLocation();
  const username = location.pathname.substring(1);

  // getting the username data
  const [usernameData, setusernameData] = useState();
  useEffect(() => {
    username &&
      firebase
        .database()
        .ref(username)
        .on("value", (snapshot) => {
          const snapshotVal = snapshot.val();
          const usernameData = [];
          for (let id in snapshotVal) {
            usernameData.push({ id, ...snapshotVal[id] });
          }
          setusernameData(usernameData);
        });
  }, []);

  // organising the info we get
  let infoArray = [];
  let linksArray = [];
  let stylesArray = [];
  let settingsArray = [];

  usernameData &&
    usernameData.map((item) =>
      item.id === "user_info"
        ? infoArray.push(item)
        : item.id === "user_links"
        ? linksArray.push(Object.values(item).slice(0, -1))
        : item.id === "user_styles"
        ? stylesArray.push(item)
        : item.id === "user_settings"
        ? settingsArray.push(Object.values(item).slice(0, -1))
        : ""
    );

  return (
    <User
      photoURL={infoArray && infoArray.length > 0 && infoArray[0].photoURL}
      displayName={
        infoArray && infoArray.length > 0 && infoArray[0].displayName
      }
      uid={infoArray && infoArray.length > 0 && infoArray[0].uid}
      links={linksArray && linksArray[0]}
      backgroundStyle={stylesArray}
      socialIcons={settingsArray}
      viewType={"normal"}
    />
  );
}

export default UserContainer;
