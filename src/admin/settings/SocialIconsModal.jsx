import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import "./Settings.css";
import uuid from "react-uuid";
import firebase from "../../firebase/firebase";
import Icons from "./icons/Icons";
import Websites from "./icons/Websites";

// ----------------------------- go to next page Icons ----------------------------- //

const arrowIcon = (
  <svg
    viewBox="0 0 16 16"
    color="palette.blueGrey8"
    enable-background="new 0 0 24 24"
    style={{ width: "24px", height: "24px" }}
  >
    <path d="M6 4.99986C5.99413 4.73335 5.9002 4.51898 5.6771 4.30461L1.46771 0.2432C1.30333 0.0809751 1.10959 -0.000137329 0.868885 -0.000137329C0.387476 -0.000137329 0 0.38225 0 0.851543C0 1.08329 0.0939335 1.30345 0.27593 1.47727L3.95695 4.99407L0.27593 8.52246C0.0998043 8.69627 0 8.91064 0 9.14818C0 9.61748 0.387476 9.99986 0.868885 9.99986C1.10372 9.99986 1.30333 9.92454 1.46771 9.75653L5.6771 5.69511C5.9002 5.48074 6 5.26058 6 4.99986Z"></path>
  </svg>
);

// ----------------------------- header Icons ----------------------------- //

const backIcon = (
  <svg
    viewBox="0 0 24 24"
    enable-background="new 0 0 24 24"
    style={{ width: "24px", height: "24px" }}
  >
    <path d="M8 12c0 .306.114.562.358.801l5.935 5.901a.926.926 0 00.699.298c.56 0 1.008-.455 1.008-1.025a1.04 1.04 0 00-.309-.736L10.398 12l5.293-5.239c.195-.198.309-.463.309-.735C16 5.455 15.553 5 14.992 5a.929.929 0 00-.7.297L8.359 11.19c-.244.248-.35.496-.358.81z"></path>
  </svg>
);

const closeIcon = (
  <svg
    viewBox="0 0 24 24"
    focusable="false"
    style={{ width: "14px", height: "24px" }}
  >
    <path d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"></path>
  </svg>
);

function SocialIconsModal({
  isOpen,
  setIsOpen,
  settingsArray,
  settingsPositionArray,
  appData,
}) {
  const localSocialIconsArray = [
    {
      id: 0,
      icon: Icons[0],
      website: Websites[0],
      isAdded: false,
    },
    {
      id: 1,
      icon: Icons[1],
      website: Websites[1],
      isAdded: false,
    },
    {
      id: 2,
      icon: Icons[2],
      website: Websites[2],
      isAdded: false,
    },
    {
      id: 3,
      icon: Icons[3],
      website: Websites[3],
      isAdded: false,
    },
    {
      id: 4,
      icon: Icons[4],
      website: Websites[4],
      isAdded: false,
    },
    {
      id: 5,
      icon: Icons[5],
      website: Websites[5],
      isAdded: false,
    },
  ];

  settingsArray &&
    settingsArray.map((item) => {
      localSocialIconsArray[item.clickedSocialIconId].isAdded = true;
    });

  const [userSocialMediaUsername, setUserSocialMediaUsername] = useState("");
  const [typingMessage, setTypingMessage] = useState("");
  const [isActive, setIsActive] = useState(false);

  function linkIsInvalid(message) {
    setTypingMessage(message);
    setIsActive(false);
  }

  function linkIsInvalid2() {
    setTypingMessage("link should contain only ...");
    setIsActive(false);
  }

  function linkIsReady() {
    setTypingMessage("");
    setIsActive(true);
  }

  function linkIsLong() {
    setTypingMessage("link seems too long");
    setIsActive(false);
  }

  function linkIsEmpty() {
    setTypingMessage("");
    setIsActive(false);
  }

  function usernameChecker(str) {
    return /^[A-Za-z0-9_.-]*$/.test(str);
  }

  // ---------- when the user is typing, a message will be displayed and th button
  // will be active or disabled based on what he is typing -----------------------
  function handleChange(value) {
    setUserSocialMediaUsername(value);
    if (
      clickedSocialIconId === 0 ||
      clickedSocialIconId === 1 ||
      clickedSocialIconId === 3 ||
      clickedSocialIconId === 4
    ) {
      if (value && (value.length < 2 || value[0] !== "@")) {
        linkIsInvalid(
          "please enter a valid " +
            Websites[clickedSocialIconId] +
            " handle, handle should countain @ and one character at least"
        );
      } else if (usernameChecker(value.slice(1, 21)) === false) {
        linkIsInvalid2();
      } else if (value.length >= 2 && value.length < 20) {
        linkIsReady();
      } else if (value.length >= 20) {
        linkIsLong();
      } else {
        linkIsEmpty();
      }
    }
    if (clickedSocialIconId === 2) {
      if (
        value &&
        (value.length <= 3 || value[0] + value[1] + value[2] !== "in/")
      ) {
        linkIsInvalid(
          "please enter a valid Linkedin route, route should be in/username and username should contain one character at least"
        );
      } else if (usernameChecker(value.slice(3, 21)) === false) {
        linkIsInvalid2();
      } else if (value.length > 3 && value.length < 20) {
        linkIsReady();
      } else if (value.length >= 20) {
        linkIsLong();
      } else {
        linkIsEmpty();
      }
    }
    if (clickedSocialIconId === 5) {
      if (value && (value.length <= 2 || value[0] + value[1] !== "c/")) {
        linkIsInvalid(
          "please enter a valid Youtube route, route should be c/username and username should contain one character at least"
        );
      } else if (usernameChecker(value.slice(2, 21)) === false) {
        linkIsInvalid2();
      } else if (value.length > 2 && value.length < 20) {
        linkIsReady();
      } else if (value.length >= 20) {
        linkIsLong();
      } else {
        linkIsEmpty();
      }
    }
  }

  function closeModal() {
    setIsOpen(false);
    setClickedSocialIconId();
    setTypingMessage("");
    setUserSocialMediaUsername("");
    setIsActive(false);
  }

  function handleBackButton() {
    setClickedSocialIconId();
    setTypingMessage("");
    setUserSocialMediaUsername("");
    setIsActive(false);
  }

  const [clickedSocialIconId, setClickedSocialIconId] = useState();
  console.log(clickedSocialIconId);

  function addSocialIcon() {
    const newSocialIcon = [
      {
        id: uuid(),
        clickedSocialIconId: clickedSocialIconId,
        isVisible: true,
      },
    ];

    const testingArray = newSocialIcon.concat(settingsArray);

    settingsArray &&
      firebase
        .database()
        .ref(appData[0].username + "/" + "user_settings")
        .set(testingArray);

    closeModal();
  }

  console.log(settingsPositionArray.length);

  return (
    <Modal isOpen={isOpen} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {clickedSocialIconId !== undefined ? (
            <div onClick={handleBackButton}>
              <Button
                colorScheme="white"
                style={{
                  padding: "0px",
                  display: "flex",
                  justifyContent: "center",
                }}
                _hover={{ background: "#edf2f7" }}
              >
                {backIcon}
              </Button>
            </div>
          ) : (
            <span></span>
          )}
          <div>Add Icon</div>
          <div className="close_icon" onClick={closeModal}>
            <Button
              colorScheme="white"
              style={{
                padding: "0px",
                display: "flex",
                justifyContent: "center",
              }}
              _hover={{ background: "#edf2f7" }}
            >
              {closeIcon}
            </Button>
          </div>
        </ModalHeader>
        <ModalBody>
          {clickedSocialIconId !== undefined ? (
            <div className="add_to_linktree_container">
              <p className="add_to_linktree_message">
                {clickedSocialIconId === 0 ||
                clickedSocialIconId === 1 ||
                clickedSocialIconId === 3 ||
                clickedSocialIconId === 5
                  ? "enter your " + Websites[clickedSocialIconId] + " username"
                  : "enter your " + Websites[clickedSocialIconId] + " path"}
              </p>
              <Input
                placeholder={
                  clickedSocialIconId === 0 ||
                  clickedSocialIconId === 1 ||
                  clickedSocialIconId === 3 ||
                  clickedSocialIconId === 4
                    ? "@username"
                    : clickedSocialIconId === 2
                    ? "in/username"
                    : clickedSocialIconId === 5
                    ? "c/username"
                    : ""
                }
                onChange={(e) => handleChange(e.target.value)}
                value={userSocialMediaUsername}
              />
              <p className="typing_message">{typingMessage}</p>
              <Button
                className="add_to_linktree_button"
                colorScheme="purple"
                isActive={isActive}
                isDisabled={!isActive}
                onClick={addSocialIcon}
              >
                Add to Linktree, clone
              </Button>
            </div>
          ) : (
            localSocialIconsArray.map((social) => {
              return (
                <div
                  key={social.id}
                  className="local_social_icons_container"
                  onClick={() =>
                    social.isAdded
                      ? console.log("no")
                      : setClickedSocialIconId(social.id)
                  }
                >
                  <div className="icon">{Icons[social.id]}</div>
                  <div className="website">{Websites[social.id]}</div>
                  <div className={social.isAdded ? "" : "arrow"}>
                    {social.isAdded ? <div>already</div> : arrowIcon}
                  </div>
                </div>
              );
            })
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SocialIconsModal;
