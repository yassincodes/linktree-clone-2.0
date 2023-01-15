import { useContext, useState, useEffect } from "react";
import { Switch } from "@chakra-ui/react";
import Icons from "./icons/Icons";
import Websites from "./icons/Websites";
import firebase from "../../firebase/firebase";
import SocialIconsModal from "./SocialIconsModal"
import { dataContext } from "../../contexts/dataContext";

function SocialIcon({ keyyy, clickedSocialIconId, isVisible }) {
  const { appData } = useContext(dataContext);

  const [isOpen, setIsOpen] = useState(false)

  function handleSwitch() {
    appData &&
      firebase
        .database()
        .ref(
          appData[0].username + "/user_settings" + "/" + keyyy + "/isVisible"
        )
        .set(!isVisible);
  }

  let dbSettingsArray = [];
  const [settingsArray, updateSettingsArray] = useState(dbSettingsArray);

  useEffect(() => {
    appData &&
      (appData.filter((item) => item.id === "user_settings")[0]
        ? appData.map(
            (item) =>
              item.id === "user_settings" &&
              updateSettingsArray(Object.values(item).slice(0, -1))
          )
        : updateSettingsArray([]));
  }, [appData]);

  function removeIcon() {
    appData.filter((item) => item.id === "user_settings")[0] &&
    settingsArray &&
    settingsArray.length > 0
      ? settingsArray.splice(keyyy, 1)
      : (settingsArray.length = 0);
    appData &&
      firebase
        .database()
        .ref(appData[0].username + "/" + "user_settings")
        .set(settingsArray);
  }

  return (
    <div className="social_icon">
      <div className="icon">{Icons[clickedSocialIconId]}</div>
      <div className="website">{Websites[clickedSocialIconId]}</div>
      <div className="switch">
        <Switch
          colorScheme="green"
          isChecked={isVisible}
          onChange={handleSwitch}
        />
      </div>
      <div className="delete">
        <button onClick={removeIcon}>delete</button>
      </div>
    </div>
  );
}

export default SocialIcon;
