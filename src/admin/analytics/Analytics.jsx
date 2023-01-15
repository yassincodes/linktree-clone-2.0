import Nav1 from "../../components/nav1/Nav1"
import Nav2 from "../../components/nav2/Nav2"
import "./Analytics.css"

function Analytics() {
    return (
      <div className="analytics-grid-container">
        <div className="analytics-item1"><Nav1 /></div>
        <div className="analytics-item2"><Nav2 /></div>
        <div className="analytics-item3">
          Analytics
        </div>
      </div>
    );
  }
  
  export default Analytics