import React from "react";

import Game from "../../utils/Game";

const Farm = ({ biome, upgrade, setGame, game }) => {
  const upgradeFarm = async () => {
    let updatedGame = Game.upgradeFarm(upgrade, biome, game);
    setGame(updatedGame);
  };

  return (
    <div className={`theme-${biome} biome-upgrade`}>
      <header className="upgrade-header">{upgrade.formattedName}</header>
      <div className={`${biome}-upgrade-image upgrade-image`}></div>
      <div className="upgrade-body">
        <div className="upgrade-description">
          {upgrade.description}
          <br />
          <br />
          {upgrade.base_amount_per_second}/second/level
        </div>
        <div className="upgrade-cost">Cost: {upgrade.cost}</div>
        <div className="upgrade-cost">Level: {upgrade.level}</div>
        <button className="upgrade-button" onClick={upgradeFarm}>
          Buy
        </button>
      </div>
    </div>
  );
};

export default Farm;
