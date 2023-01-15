import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/authContext";
import { dataContext } from "../contexts/dataContext";

function Home() {
  const { signInWithGoogle } = useContext(authContext);
  const { appData } = useContext(dataContext);

  if (appData && appData[0].uid) {
    return <div>contine to admin</div>;
  } else {
    return (
      <div>
        <Link to="/admin">
          <Button onClick={signInWithGoogle}>sign in with google</Button>
        </Link>
      </div>
    );
  }
}

export default Home;
