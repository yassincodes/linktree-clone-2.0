// for adding animation
// there is an animation function that will now appear only if 
// the user clicks on add link

// possible bug: what if a user calls himself undenified

// minimalist store possible bug: a user can add to cart only if his uid is in the database
import { Switch, Tooltip } from "@chakra-ui/react";
import firebase from "../../firebase/firebase";
import { dataContext } from "../../contexts/dataContext";
import { useContext, useState, useEffect } from "react";

const dragIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 4C5.55228 4 6 3.55228 6 3C6 2.44772 5.55228 2 5 2C4.44772 2 4 2.44772 4 3C4 3.55228 4.44772 4 5 4ZM6 8C6 8.55228 5.55228 9 5 9C4.44772 9 4 8.55228 4 8C4 7.44772 4.44772 7 5 7C5.55228 7 6 7.44772 6 8ZM6 13C6 13.5523 5.55228 14 5 14C4.44772 14 4 13.5523 4 13C4 12.4477 4.44772 12 5 12C5.55228 12 6 12.4477 6 13ZM12 8C12 8.55228 11.5523 9 11 9C10.4477 9 10 8.55228 10 8C10 7.44772 10.4477 7 11 7C11.5523 7 12 7.44772 12 8ZM11 14C11.5523 14 12 13.5523 12 13C12 12.4477 11.5523 12 11 12C10.4477 12 10 12.4477 10 13C10 13.5523 10.4477 14 11 14ZM12 3C12 3.55228 11.5523 4 11 4C10.4477 4 10 3.55228 10 3C10 2.44772 10.4477 2 11 2C11.5523 2 12 2.44772 12 3Z"
      fill="#676B5F"
    ></path>
  </svg>
);

const starIcon = (
  <svg
    viewBox="0 0 16 16"
    display="block"
    enableBackground="new 0 0 24 24"
    className="sc-iumJyn bmfXnh"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.613 1.434l1.33 4.007a.625.625 0 00.6.422h4.318a.623.623 0 01.378 1.13l-3.5 2.487a.6.6 0 00-.227.68l1.334 4.017a.639.639 0 01-.991.7L8.37 12.4a.642.642 0 00-.739 0l-3.485 2.477a.638.638 0 01-.99-.7l1.335-4.02a.6.6 0 00-.227-.68l-3.5-2.485a.622.622 0 01.378-1.129h4.32a.624.624 0 00.6-.422l1.33-4.007a.649.649 0 011.221 0z"
    ></path>
  </svg>
);

const lockIcon = (
  <svg
    viewBox="0 0 12 17"
    display="block"
    enableBackground="new 0 0 24 24"
    className="sc-iumJyn bmfXnh"
  >
    <path d="M2.10899 16.0742H9.61366C10.7788 16.0742 11.3613 15.4916 11.3613 14.196V8.40465C11.3613 7.23944 10.8901 6.64813 9.93921 6.54378V4.59596C9.93921 1.61335 8.02877 0.0742188 5.86133 0.0742188C3.69388 0.0742188 1.78345 1.61335 1.78345 4.59596V6.54378C0.832512 6.64813 0.361328 7.23944 0.361328 8.40465V14.196C0.361328 15.4916 0.935316 16.0742 2.10899 16.0742ZM2.90572 4.46552C2.90572 2.35248 4.22504 1.15248 5.86133 1.15248C7.48905 1.15248 8.81694 2.35248 8.81694 4.46552V6.52639H2.90572V4.46552ZM2.14326 15.0133C1.68921 15.0133 1.47504 14.822 1.47504 14.2655V8.32639C1.47504 7.76987 1.68921 7.58726 2.14326 7.58726H9.58796C10.0334 7.58726 10.2391 7.76987 10.2391 8.32639V14.2655C10.2391 14.822 10.0334 15.0133 9.58796 15.0133H2.14326Z"></path>
  </svg>
);

const staticsIcon = (
  <svg
    viewBox="0 0 16 16"
    display="block"
    enableBackground="new 0 0 24 24"
    className="sc-iumJyn bmfXnh"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.5 15.446L.553 15.5.5.5"
    ></path>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.493 13.494l.007-2a1 1 0 00-.994-1h-1a1 1 0 00-1 .994l-.007 2M10.493 13.494l.007-6a1 1 0 00-.994-1h-1a1 1 0 00-1 .994l-.007 6M15.493 13.494l.007-10a1 1 0 00-.994-1h-1a1 1 0 00-1 .994l-.007 10"
    ></path>
  </svg>
);

const deleteIcon = (
  <svg
    viewBox="0 0 16 16"
    display="block"
    enableBackground="new 0 0 24 24"
    className="sc-iumJyn bmfXnh"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 2.5v-2h4v2M1 2.5h14M9.533 13.5l.25-9M6.217 4.5l.25 9M2.661 4.5l.889 11h8.9l.888-11"
    ></path>
  </svg>
);

function Link({ keyyy, id, isDeleted, isVisible, url, title, prioritize, lock, analytics}) {

  const { appData } = useContext(dataContext);

  /* -------------------------------------------------- */

  function handleSwitch() {
    appData && 
    firebase
    .database()
    .ref(appData[0].username + "/user_links" + "/" + keyyy + "/isVisible")
    .set(!isVisible)
  }
  
  /* -------------------------------------------------- */

  function prioritizeLink() {
    console.log("prioritize link");
  }

  /* -------------------------------------------------- */

  function lockLink() {
    console.log("lock link");
  }

  /* -------------------------------------------------- */

  function showAnaylitcs() {
    console.log("show button analytics");
  }

  /* -------------------------------------------------- */

  let dbLinksArray = [];
  const [linksArray, updateLinksArray] = useState(dbLinksArray);

  useEffect(() => {
    appData 
    && (appData.filter((item) => item.id === 'user_links')[0] ? appData.map((item) => item.id === 'user_links' && updateLinksArray(Object.values(item).slice(0,-1))) : updateLinksArray([]))

  }, [appData])

  function removeLink() {
   (appData.filter((item) => item.id === 'user_links')[0] && linksArray && linksArray.length > 0) ? linksArray.splice(keyyy, 1) : linksArray.length = 0
    appData &&
    firebase
      .database()
      .ref(appData[0].username + "/" + "user_links")
      .set(linksArray)
  }
  
  /* -------------------------------------------------- */ 

  const [newTitle, setNewTitle] = useState(title);
  const [newUrl, setNewUrl] = useState(url);

  function handleNewTitle(value) {
    setNewTitle(value)
    const delayDebounceFn = setTimeout(() => {
      appData && 
      firebase
      .database()
      .ref(appData[0].username + "/user_links" + "/" + keyyy + "/title")
      .set(value)
    }, 100)
    return () => clearTimeout(delayDebounceFn);
  }

  function handleNewUrl(value) {
    setNewUrl(value)
    const delayDebounceFn = setTimeout(() => {
      appData && 
      firebase
      .database()
      .ref(appData[0].username + "/user_links" + "/" + keyyy + "/url")
      .set(value)
    }, 100)
    return () => clearTimeout(delayDebounceFn);
  }

  /* -------------------------------------------------- */

  return (
    <div className="link">
      <div className="drag_icon">{dragIcon}</div>
      <div className="link_container">
        <div className="edit_link">
          <div>
            <div>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => handleNewTitle(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={newUrl}
                onChange={(e) => handleNewUrl(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Switch colorScheme="green" isChecked={isVisible} onChange={handleSwitch} />
          </div>
        </div>
        <div className="link_properties_container">
          <div className="link_properties">
            <div className="link_propertie" onClick={prioritizeLink}>
              <Tooltip label="Prioritize">{starIcon}</Tooltip>
            </div>
            <div className="link_propertie" onClick={lockLink}>
              <Tooltip label="Lock">{lockIcon}</Tooltip>
            </div>
            <div className="link_propertie" onClick={showAnaylitcs}>
              <Tooltip label="Anaylitcs">
                <div style={{ marginRight: "4px" }}>{staticsIcon}</div>
              </Tooltip>
              <Tooltip label="Lifetime clicks">
                <div>0 clicks</div>
              </Tooltip>
            </div>
          </div>
          <div>
            <div className="link_propertie" onClick={removeLink}>
              <Tooltip label="Delete">{deleteIcon}</Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Link;
