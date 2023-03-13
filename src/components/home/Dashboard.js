import React from "react";
import { useState } from "react";
import "../../styles/Home.css";

const Dashboard = ({ score }) => {


const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className="dashboard">
        <ul className = 'dashboard-nav'>
        <li className={`dashboard-nav-item ${activeTab === 'editor' ? 'active' : ''}`} onClick={() => handleTabClick('editor')}>Editor</li>
        <li className={`dashboard-nav-item ${activeTab === 'upgrades' ? 'active' : ''}`} onClick={() => handleTabClick('upgrades')}>Upgrades</li>
        <li className={`dashboard-nav-item ${activeTab === 'tab3' ? 'active' : ''}`} onClick={() => handleTabClick('tab3')}></li>
        </ul>
        <div className="top-divider"></div>
        {activeTab === 'editor' && <div>Content for Tab 1</div>}
        {activeTab === 'upgrades' && <div>Content for Tab 2</div>}
        {activeTab === 'tab3' && <div>Content for Tab 3</div>}
    </div>
  );
}
export default Dashboard;