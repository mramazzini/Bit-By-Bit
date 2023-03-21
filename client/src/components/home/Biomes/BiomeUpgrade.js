import React from "react";

const BiomeUpgrade = ({ biome, upgrade }) => {
  return (
    <div className={`${biome}-biome-upgrade biome-upgrade`}>
      <header className="upgrade-header">{upgrade.name}</header>
      <image className={`${biome}-upgrade-image upgrade-image`}></image>
      <div className="upgrade-body">
        <div className="upgrade-description">{upgrade.description}</div>
        <div className="upgrade-cost">{upgrade.cost}</div>
        <div className="upgrade-button">Buy</div>
      </div>
    </div>
  );
};

export default BiomeUpgrade;
