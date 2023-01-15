import { useState } from "react";
import Nav1 from "../../components/nav1/Nav1";
import Nav2 from "../../components/nav2/Nav2";
import Nav3 from "../../components/nav3/Nav3";
import Phone from "../../components/phone/Phone";
import Profile from "./sections/Profile";
import Background from "./sections/Background";
import Buttons from "./sections/Buttons";
import Typography from "./sections/Typography";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerContent,
  Center,
  Button,
} from "@chakra-ui/react";

function Appearance() {
  const [isOpen, setIsOpen] = useState(false);
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
        <section>
          <h2>Profile</h2>
          <Profile />
        </section>
        <section>
          <h2>Background</h2>
          <Background />
        </section>
        <section>
          <h2>Buttons</h2>
          <Buttons />
        </section>
        <section>
          <h2>Typography</h2>
          <Typography />
        </section>
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
}

export default Appearance;
