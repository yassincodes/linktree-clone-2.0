import { useContext, useState, useEffect } from "react";
import { Button, RadioGroup, Stack, Radio } from "@chakra-ui/react";
import SocialIconsModal from "./SocialIconsModal";
import SocialIcon from "./SocialIcon";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Settings.css";
import { dataContext } from "../../contexts/dataContext";
import firebase from "../../firebase/firebase";

function SocialIcons() {
  const { appData } = useContext(dataContext);

  let dbSettingsArray = [];
  const [settingsArray, updateSettingsArray] = useState(dbSettingsArray);

  const [settingsPositionArray, updateSettingsPositionArray] = useState([]);

  const [isAppDataLoaded, setIsAppDataLoaded] = useState(false);
  useEffect(() => {
    appData &&
      (appData.filter((item) => item.id === "user_settings")[0]
        ? appData.map(
            (item) =>
              item.id === "user_settings" &&
              updateSettingsArray(Object.values(item).slice(0, -1))
          )
        : appData[0].uid && updateSettingsArray([]));

    appData &&
      (appData.filter((item) => item.id === "user_settings_position")[0]
        ? appData.map(
            (item) =>
              item.id === "user_settings_position" &&
              updateSettingsPositionArray(Object.values(item).slice(0, -1))
          )
        : appData[0].uid && updateSettingsPositionArray([]));
    setIsAppDataLoaded(true);
  }, [appData]);

  console.log(settingsArray);

  const [triggerEffect, setTriggerEffect] = useState(0);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(settingsArray);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateSettingsArray(items);

    setTriggerEffect(triggerEffect + 1);
  }

  useEffect(() => {
    appData &&
      isAppDataLoaded &&
      firebase
        .database()
        .ref(appData[0].username + "/" + "user_settings")
        .set(settingsArray);
  }, [triggerEffect]);

  const [isOpen, setIsOpen] = useState(false);

  const [value, setValue] = useState("Top");

  useEffect(() => {
    settingsPositionArray &&
      settingsPositionArray.length > 0 &&
      firebase
        .database()
        .ref(appData[0].username + "/" + "user_settings_position")
        .set([{ positions: value }]);
  }, [value]);

  useEffect(() => {
    settingsPositionArray.length > 0 &&
      setValue(settingsPositionArray[0].positions);
  }, [settingsPositionArray && settingsPositionArray[0]]);

  useEffect(() => {
    (isAppDataLoaded && appData && settingsPositionArray && settingsPositionArray.length === 0) &&
    firebase
      .database()
      .ref(appData[0].username + "/" + "user_settings_position")
      .set([{positions: "Top"}]);
  }, [isAppDataLoaded && settingsPositionArray.length === 0])

  if (appData && settingsArray.length > 0) {
    return (
      <>
        <div className="add_icon_main_section">
          <div className="add_icon_button">
            <Button
              width="95%"
              padding="12px"
              borderRadius="12px"
              colorScheme="purple"
              onClick={() => setIsOpen(true)}
            >
              Add Icon
            </Button>
          </div>

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {settingsArray.length > 0 &&
                    settingsArray.map(
                      ({ id, clickedSocialIconId, isVisible }, index) => {
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
                                <SocialIcon
                                  keyyy={index}
                                  clickedSocialIconId={clickedSocialIconId}
                                  isVisible={isVisible}
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

        <SocialIconsModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          settingsArray={settingsArray}
          settingsPositionArray={settingsPositionArray}
          appData={appData}
        />

        <div>
          <p>Reorder icons by dragging the items above.</p>
        </div>
        <div>
          <h3>Position</h3>
          <p>Display icons at the:</p>
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction="column">
              <Radio value="Top">First</Radio>
              <Radio value="Bottom">Second</Radio>
            </Stack>
          </RadioGroup>
        </div>
      </>
    );
  } else if (appData && settingsArray.length === 0) {
    return (
      <div className="add_icon_no_data_section">
        <img src="https://assets.production.linktr.ee/9cdf04d9071e53d06ff81a4dd00722ce5af47708/images/cover-social-links.jpg" />

        <div className="add_icon_no_data_section_message">
          <h2>Be Iconic</h2>
          <p>
            Show visitors all the ways they can engage with you and your
            content.
          </p>
        </div>

        <div className="add_icon_button">
          <Button
            width="95%"
            padding="12px"
            borderRadius="12px"
            colorScheme="purple"
            onClick={() => setIsOpen(true)}
          >
            Add Icon
          </Button>
        </div>

        <SocialIconsModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          settingsArray={settingsArray}
          settingsPositionArray={settingsPositionArray}
          appData={appData}
        />
      </div>
    );
  } else {
    return <div>loading</div>;
  }
}

export default SocialIcons;
