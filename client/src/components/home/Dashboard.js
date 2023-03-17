import React from "react";
import { useState } from "react";
import "../../styles/Home.css";
import UpgradesStore from "./UpgradesStore";
const Dashboard = ({ score }) => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className="dashboard">
      <ul className="dashboard-nav">
        <li
          className={`dashboard-nav-item ${
            activeTab === "editor" ? "active" : ""
          }`}
          onClick={() => handleTabClick("editor")}
        >
          Problems
        </li>
        <li
          className={`dashboard-nav-item ${
            activeTab === "upgrades" ? "active" : ""
          }`}
          onClick={() => handleTabClick("upgrades")}
        >
          Upgrades
        </li>
        <li
          className={`dashboard-nav-item ${
            activeTab === "tab3" ? "active" : ""
          }`}
          onClick={() => handleTabClick("tab3")}
        >
          tab 3
        </li>
      </ul>
      <div className="top-divider"></div>
      <div className="dashboard-body">
        {activeTab === "editor" && <div>Content for Tab 1</div>}
        {activeTab === "upgrades" && <UpgradesStore />}
        {activeTab === "tab3" && <div>Content for Tab 3</div>}
      </div>
    </div>
  );
};
export default Dashboard;
