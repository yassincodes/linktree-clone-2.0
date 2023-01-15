import "./Nav3.css";
import { useState } from "react";

function Nav3() {
  const [displayedText, setDisplayedText] = useState("copy");
  function copy() {
    navigator.clipboard.writeText("lintre-ee.web.app/yassin");
    setDisplayedText("copied");
    setTimeout(() => {
      setDisplayedText("copy");
    }, 1500);
  }
  return (
    <div className="Nav3">
      <div className="my_link">
        <a href="https://linktr-ee.web.app/yassin" target="_blank">
         linktr-ee.web.app/yassin
        </a>
      </div>
      <div
        className="copy"
        style={displayedText == "copied" ? { color: "green" } : {}}
        onClick={copy}
      >
        {displayedText}
      </div>
    </div>
  );
}

export default Nav3;