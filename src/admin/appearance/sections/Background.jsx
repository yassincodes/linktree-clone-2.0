import { useContext } from "react";
import firebase from "../../../firebase/firebase"
import { dataContext } from "../../../contexts/dataContext";
import "../Appearance.css"

const backgrounds = [
    {
        id: 1,
        backgroundStyle: 'style 1',
        style: ''
    },
    {
        id: 2,
        backgroundStyle: 'style 2',
        style: ''
    },
    {
        id: 3,
        backgroundStyle: 'style 3',
        style: ''
    },
    {
        id: 4,
        backgroundStyle: 'style 4',
        style: ''
    },
    {
        id: 5,
        backgroundStyle: 'style 5',
        style: ''
    },
    {
        id: 6,
        backgroundStyle: 'style 6',
        style: ''
    }
]

function Background() {
    const { appData } = useContext(dataContext);

    function handleBackgroundStyle(backgroundStyle) {
        appData && firebase
          .database()
          .ref(appData[0].username + "/" + "user_styles" + "/" + "backgroundStyle")
          .set(backgroundStyle)
    }  

    return (
        <div className="section_container">
            {backgrounds.map((background, key) => {
                return (
                    <div key={background.id}>
                        <button onClick={() => handleBackgroundStyle(background.backgroundStyle)}>button</button>
                    </div>
                )
            })}
        </div>
      )
}

export default Background