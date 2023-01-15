import { useContext } from "react";
import firebase from "../../../firebase/firebase"
import "../Appearance.css"
import { dataContext } from "../../../contexts/dataContext";

const buttons = [
    {
        id: 1,
        buttonStyle: 'curved',
        style: ''
    },
    {
        id: 2,
        buttonStyle: 'curved 2',
        style: ''
    },
    {
        id: 3,
        buttonStyle: 'curved 3',
        style: ''
    },
    {
        id: 4,
        buttonStyle: 'curved 4',
        style: ''
    },
    {
        id: 5,
        buttonStyle: 'curved 5',
        style: ''
    },
    {
        id: 6,
        buttonStyle: 'curved 6',
        style: ''
    }
]

function Buttons() {
    return (
        <div className="section_container">
            {buttons.map((button, key) => {
                return (
                    <div key={button.id}>
                        button
                    </div>
                )
            })}
        </div>
      )
}

export default Buttons