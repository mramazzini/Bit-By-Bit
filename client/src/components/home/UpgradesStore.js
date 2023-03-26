import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BIOMES, GET_FARMS } from "../utils/queries";
import Game from "../utils/Game";
const UpgradesStore = ({ setGame, game }) => {
  const [initialized, setInitialized] = useState(false);

  const { loading, error, data } = useQuery(GET_BIOMES);
  const {
    loading: loadingFarms,
    error: errorFarms,
    data: dataFarms,
  } = useQuery(GET_FARMS);

  const handlePurchase = async (name) => {
    //Purchase the upgrade
    const updatedGame = Game.purchaseUpgrade(
      game,
      name,
      data.biomes,
      dataFarms.farms
    );
    setGame(updatedGame);
  };
  if (loading || loadingFarms) {
    return "loading";
  } else if (error || errorFarms) {
    return "error loading, please refresh page";
  } else if (!initialized) {
    setInitialized(true);
  } else {
    return (
      <div className="upgrades-store">
        {game.upgrades.map((upgrade, index) =>
          upgrade.status === "shown" ? (
            <div key={index}>
              <button
                className="store-item"
                onClick={() => handlePurchase(upgrade.name)}
              >
                <h3>{upgrade.name}</h3>
                <p>{upgrade.description}</p>
                <p> {upgrade.flavor}</p>
                <p>Cost: {upgrade.price}</p>
              </button>
            </div>
          ) : null
        )}
      </div>
    );
  }
};

export default UpgradesStore;
