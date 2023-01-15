function User({ photoURL, displayName, uid, links, viewType }) {
  function handleAnalytics() {
    if (viewType === "admin") {
        console.log("no sending")
    } else {
        console.log("send analytics function")
    }
  }

  if (uid) {
    return (
      <div
        className="user_uu bg"
        style={
          viewType === "admin" ? { fontSize: "0.69em" } : { fontSize: "1em" }
        }
      >
        <div className="user_info_uu">
          <img
            src={photoURL}
            alt="user"
            style={
              viewType === "admin" ? { width: "40px" } : { diplay: "initial" }
            }
          />
          <h2>{displayName}</h2>
        </div>
        <div className="user_links_uu">
          {links &&
            links.map((link, key) => {
              if (link.title) {
                return (
                  <a
                    key={link.id}
                    className="button_uu font_uu"
                    href={"https://" + link.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleAnalytics}
                  >
                    {link.title}
                  </a>
                )
              } else {
                return <div style={{ visibility: "hidden" }}>title</div>;
              }
            })}
        </div>
      </div>
    );
  } else {
    return <div>loading</div>;
  }
}

export default User;
