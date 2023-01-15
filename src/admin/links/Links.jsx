import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "react-uuid";
import { authContext } from "../../contexts/authContext";
import { dataContext } from "../../contexts/dataContext";
import firebase from "../../firebase/firebase";
import ChooseUsername from "./ChooseUsername";
import Nav1 from "../../components/nav1/Nav1";
import Nav2 from "../../components/nav2/Nav2";
import Nav3 from "../../components/nav3/Nav3";
import Phone from "../../components/phone/Phone";
import Link from "./Link";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerContent,
  Center,
  Button,
} from "@chakra-ui/react";
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

  // storing the links coming from appData in linksArray
  let dbLinksArray = [];
  const [linksArray, updateLinksArray] = useState(dbLinksArray);

  // it is one hundred percent clear that the problem is here
  // I only get the date from here if appData[1] exist, which exist pretty slowly
  // isAppDataLoaded state will trigger if appData is loaded or not
  // if app data is loaded triggerEffect2 will be true
  // we need this so that the second useEffect will only run
  // if there is something in appData
  const [isAppDataLoaded, setIsAppDataLoaded] = useState(false);
  useEffect(() => {
    appData &&
      (appData.filter((item) => item.id === 'user_links')[0]
        ? appData.map(
            (item) =>
              item.id === "user_links" &&
              updateLinksArray(Object.values(item).slice(0, -1))
          )
        : appData[0].uid && updateLinksArray([]));
    setIsAppDataLoaded(true);
    // I need this later
    // appData && console.log(appData.filter((item) => item.id === 'user_links'))
    // appData && console.log(appData[1])
    // appData && console.log(appData.filter((item) => item.id === 'user_links')[0])
  }, [appData]);

  // storing the new order in linksArray & triggering effect
  const [triggerEffect, setTriggerEffect] = useState(0);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(linksArray);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateLinksArray(items);

    setTriggerEffect(triggerEffect + 1);
  }

  useEffect(() => {
    appData &&
      isAppDataLoaded &&
      firebase
        .database()
        .ref(appData[0].username + "/" + "user_links")
        .set(linksArray);
  }, [triggerEffect]);

  function addLink() {
    const newLink = [
      {
        title: "title",
        url: "url",
        id: uuid(),
        prioritize: false,
        lock: false,
        analytics: "analytics",
        isVisible: true,
        isDeleted: false,
      },
    ];

    const testingArray = newLink.concat(linksArray);

    linksArray &&
      firebase
        .database()
        .ref(appData[0].username + "/" + "user_links")
        .set(testingArray);
  }

  // adding text, youtube, twitter
  function explore() {
    console.log(explore);
  }

  // UI UI UI UI UI UI UI UI UI UI
  if (dataCenter && dataCenter.length == 2) {
    return (
      <div className="grid-container">
        <div className="item1">
          <Nav1 />
        </div>
        <div className="item2">
          <Nav2 />
        </div>
        <div className="item3">
          <Nav3 />
        </div>
        <div className="item4">
          <div className="buttons">
            <Button
              width="48%"
              padding="23px"
              borderRadius="44px"
              colorScheme="purple"
              onClick={addLink}
            >
              Add New Link
            </Button>
            <Button
              width="48%"
              padding="23px"
              borderRadius="44px"
              colorScheme="purple"
              onClick={explore}
            >
              Explore
            </Button>
          </div>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <ul
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {linksArray &&
                    linksArray.map(
                      (
                        {
                          id,
                          visible,
                          url,
                          title,
                          prioritize,
                          lock,
                          analytics,
                          isVisible,
                          isDeleted,
                        },
                        index
                      ) => {
                        return (
                          <Draggable
                            key={id.toString()}
                            draggableId={id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Link
                                  keyyy={index}
                                  id={id}
                                  url={url}
                                  title={title}
                                  prioritize={prioritize}
                                  lock={lock}
                                  analytics={analytics}
                                  isVisible={isVisible}
                                  isDeleted={isDeleted}
                                />
                              </div>
                            )}
                          </Draggable>
                        );
                      }
                    )}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="item5">
          <Phone />
        </div>
        <div className="see_page">
          <Button
            bg="#d7dce1"
            padding="14px 24px"
            _hover={{ bg: "#d7dce1" }}
            borderRadius="44px"
            onClick={() => setIsOpen(true)}
          >
            <img
              style={{ marginRight: "10px" }}
              src="https://assets.production.linktr.ee/14f6b0bd648f6f157cb40b7dc3f45e063bd82031/images/icon-eye_preview-button.svg"
            />
            preview
          </Button>
        </div>
        <Drawer isOpen={isOpen} size="full" placement="bottom">
          <DrawerContent>
            <DrawerBody style={{ padding: 0 }}>
              <Phone />
            </DrawerBody>
            <Center>
              <DrawerFooter>
                <Button
                  bg="#d7dce1"
                  padding="30px 24px"
                  _hover={{ bg: "#d7dce1" }}
                  borderRadius="50%"
                  onClick={() => setIsOpen(false)}
                >
                  <img src="https://assets.production.linktr.ee/c987488e509df2d74bacac14c08cd77ab6950563/images/icon-cross-large.svg" />
                </Button>
              </DrawerFooter>
            </Center>
          </DrawerContent>
        </Drawer>
      </div>
    );
  } else if (dataCenter && dataCenter.length == 1) {
    return <ChooseUsername />;
  } else {
    return "todo: loading background should be gray and divided by two";
  }
}

export default Links;
