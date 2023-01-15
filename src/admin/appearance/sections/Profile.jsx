import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import firebase, { storage } from "../../../firebase/firebase";
import { getDownloadURL, listAll, ref, uploadBytes, deleteObject } from "firebase/storage";
import { dataContext } from "../../../contexts/dataContext";
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spinner,
} from "@chakra-ui/react";
import "../Appearance.css";

function Profile() {
  const { appData } = useContext(dataContext);
  const location = useLocation();

  const [newDisplayName, setNewDisplayName] = useState("");
  const [newBio, setNewBio] = useState("");

  useEffect(() => {
    appData && setNewDisplayName(appData[0].displayName);
    appData && setNewBio(appData[0].bio);
  }, [appData && location]);

  function handleNewDisplayName(value) {
    setNewDisplayName(value);
    const delayDebounceFn = setTimeout(() => {
      appData &&
        firebase
          .database()
          .ref(appData[0].uid + "/user_info_section_1" + "/" + "displayName")
          .set(value) &&
        firebase
          .database()
          .ref(appData[0].username + "/user_info" + "/" + "displayName")
          .set(value);
    }, 100);
    return () => clearTimeout(delayDebounceFn);
  }

  function handleNewBio(value) {
    setNewBio(value);
    const delayDebounceFn = setTimeout(() => {
      appData &&
        firebase
          .database()
          .ref(appData[0].uid + "/user_info_section_1" + "/" + "bio")
          .set(value) &&
        firebase
          .database()
          .ref(appData[0].username + "/user_info" + "/" + "bio")
          .set(value);
    }, 100);
    return () => clearTimeout(delayDebounceFn);
  }

  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  const imageRef = appData && ref(storage, `${appData[0].username + "/profilePhoto"}`);

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const [trigger, setTrigger] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  function handleUploadImage() {
    if (image) {
      setIsLoading(true);
      appData &&
        uploadBytes(imageRef, image).then(() => {
          listAll(ref(storage, appData[0].username)).then((response) => {
            response.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                setImageUrl(url);
                setTrigger(trigger + 1);
              });
            });
          });
        });
    } else {
      alert("hi");
    }
  }

  const [isLoading2, setIsLoading2] = useState(false);
  function handleRemove() {
    setIsLoading2(true);
    setTrigger(trigger + 1);
    deleteObject(imageRef).then(() => {
      // File deleted successfully
    })
    setImageUrl("---")
  }

  useEffect(() => {
    appData &&
      imageUrl &&
      firebase
        .database()
        .ref(appData[0].uid + "/user_info_section_1" + "/" + "photoURL")
        .set(imageUrl) &&
      firebase
        .database()
        .ref(appData[0].username + "/user_info" + "/" + "photoURL")
        .set(imageUrl) &&
      setIsLoading(false);
    setIsLoading2(false);
    setIsOpen(false);
    console.log("triggered");
  }, [appData && trigger]);


  return (
    <div className="section_container">
      <div className="profile_image_settings_container">
        <div className="profile_image_settings_image">
          {appData && appData[0].photoURL !== "---" ? (
            <img
              style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              src={appData[0].photoURL}
            />
          ) : appData && appData[0].photoURL === "---" ? (
            <div style={{width: "80px", height: "80px", borderRadius: "50%", background: "lightgray"}}></div>
          ) : (
            <Spinner color="purple" />
          )}
        </div>
        <div className="profile_image_settings_buttons">
          <Button borderRadius="44px" colorScheme="purple" onClick={openModal}>
            Pick an image
          </Button>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            isCentered={true}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>upload Image</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <Button
                  isLoading={isLoading}
                  colorScheme="purple"
                  onClick={handleUploadImage}
                  spinner={<Spinner color="white" />}
                >
                  upload
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
          <Button
            borderRadius="44px"
            isLoading={isLoading2}
            onClick={handleRemove}
            spinner={<Spinner />}
          >
            Remove
          </Button>
        </div>
      </div>
      <Input
        type="text"
        value={newDisplayName}
        onChange={(e) => handleNewDisplayName(e.target.value)}
      />
      <Input
        type="text"
        value={newBio}
        onChange={(e) => handleNewBio(e.target.value)}
      />
    </div>
  );
}

export default Profile;
