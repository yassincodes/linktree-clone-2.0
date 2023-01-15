import "./Nav2.css";
import { Link, useLocation } from "react-router-dom";

function Nav2() {
  const location = useLocation();
  return (
    <div className="Nav2">
      <div className="navigatingLink" style={location.pathname == "/admin" ? {color: "black"} : {}}>
        <Link to="/admin" className="navigationLink-link">Admin</Link>
      </div>
      <div className="navigatingLink" style={location.pathname == "/admin/appearance" ? {color: "black"} : {}} >
        <Link to="/admin/appearance" className="navigationLink-link">Appearance</Link>
      </div>
      <div className="navigatingLink" style={location.pathname == "/admin/settings" ? {color: "black"} : {}}>
        <Link to="/admin/settings" className="navigationLink-link">Settings</Link>
      </div>
      <div className="navigatingLink" style={location.pathname == "/admin/analytics" ? {color: "black"} : {}}>
        <Link to="/admin/analytics" className="navigationLink-link">Analytics</Link>
      </div>
    </div>
  );
}

export default Nav2;