import { useContext } from "react";
import "./Phone.css";
import User from "../../user/User";
import { dataContext } from "../../contexts/dataContext";

function Phone() {
  const { appData } = useContext(dataContext);

  // organising the info we get
  let infoArray = [];
  let linksArray = [];
  let stylesArray = [];
  let settingsArray = [];

  appData &&
    appData.map((item) =>
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
    <div className="phone">
      <User
        photoURL={infoArray && infoArray.length > 0 && infoArray[0].photoURL}
        displayName={infoArray && infoArray.length > 0 && infoArray[0].displayName}
        uid={infoArray && infoArray.length > 0 && infoArray[0].uid}
        links={linksArray && linksArray[0]}
        backgroundStyle={stylesArray}
        socialIcons={settingsArray}
        viewType={"admin"}
      />
    </div>
  );
}

export default Phone;
