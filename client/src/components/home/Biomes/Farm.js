import React from "react";

const Farm = ({ biome, upgrade }) => {
  return (
    <div className={`${biome}-biome-upgrade biome-upgrade`}>
      <header className="upgrade-header">{upgrade.name}</header>
      <div className={`${biome}-upgrade-image upgrade-image`}></div>
      <div className="upgrade-body">
        <div className="upgrade-description">{upgrade.description}</div>
        <div className="upgrade-cost">{upgrade.cost}</div>
        <div className="upgrade-button">Buy</div>
      </div>
    </div>
  );
};

export default Farm;
