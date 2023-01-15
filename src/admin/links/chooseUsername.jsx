import { useState, useContext } from "react"
import firebase from "../../firebase/firebase";
import { dataContext } from "../../contexts/dataContext";


function ChooseUsername() {

  const { dataCenter, usernames, theUsernames } = useContext(dataContext);

  // declaring the username state and creating it
  const [theUsername, setTheUsername] = useState("");
  
  function createAUsername() {
    console.log(
      usernames && dataCenter && theUsername.match("^[A-Za-z0-9_]+$")
    );
    if (usernames && dataCenter && theUsernames.includes(theUsername)) {
      alert("that username exists");
    } else if (theUsername.toUpperCase() === "ADMIN") {
      alert("sorry, you can't use that username");
    } else if (theUsername.length > 18) {
      alert("username should not be longer then 18 characters");
    } else if (
      usernames &&
      dataCenter &&
      theUsername.match("^[A-Za-z0-9_]+$")
    ) {

      firebase
        .database()
        .ref(localStorage.getItem("this_uid") + "/" + "user_info_section_2")
        .set({
          username: theUsername,
        });
      firebase
        .database()
        .ref(theUsername + "/" + "user_info")
        .set({
          username: theUsername,
          uid: dataCenter[0].uid,
          displayName: dataCenter[0].displayName,
          bio: dataCenter[0].bio,
          photoURL: dataCenter[0].photoURL,
          email: dataCenter[0].email,
        }) &&
        firebase
          .database()
          .ref("usernames" + "/" + theUsername)
          .set({
            username: theUsername,
          });
    } else {
      alert("username should only contain characters and numbers");
    }
  }

    return (
        <div className="username_page">
          <div>come rate me log on the top left</div>
          <div>we are almost done, just choose a username :)</div>
          <div>
            <input
              type="text"
              onChange={(e) => setTheUsername(e.target.value)}
              placeholder="your username"
              value={theUsername}
            />
            <button onClick={createAUsername}>create my account</button>
          </div>
          <div>
            note: you can find an amazing username with my other product UH.
            UH will help you find an amazing username not only here but
            in all your social media accounts
          </div>
      </div>
    )
}

export default ChooseUsername