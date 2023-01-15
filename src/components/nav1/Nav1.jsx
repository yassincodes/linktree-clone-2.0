import "./Nav1.css";
import { useContext, useState } from "react";
import { dataContext } from "../../contexts/dataContext";
import { authContext } from "../../contexts/authContext";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Button,
  Portal,
} from "@chakra-ui/react";

function Nav1() {
  const { dataCenter } = useContext(dataContext);
  const { logout } = useContext(authContext);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="Nav1">
      <div className="logo">
        <img
          src="https://assets.production.linktr.ee/19e2fb9fd15fa2b9e8b73837682e0c30b71c9085/images/logo_trees.svg"
          alt="Linktree Symbol"
        />
      </div>
      <div className="avatar">
        <Popover isOpen={isOpen} placement="bottom">
          <PopoverTrigger>
            <div onClick={() => setIsOpen(!isOpen)}>
              <img src={dataCenter && dataCenter[0].photoURL} />
            </div>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverHeader>
                {dataCenter && dataCenter[0].displayName}
              </PopoverHeader>
              <PopoverBody>
                <Button colorScheme="red">Log out</Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </div>
    </div>
  );
}

export default Nav1;