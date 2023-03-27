import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Biome from "./biomes/Biome";
import Game from "../utils/Game";
const AdventureTabs = ({ setGame, game }) => {
  const ACTIVE_TAB_KEY = "activeTab";
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem(ACTIVE_TAB_KEY) || ""
  );

  const openBiome = (biomeName) => {
    setActiveTab(biomeName);
    localStorage.setItem(ACTIVE_TAB_KEY, biomeName);
  };

  return (
    <div className="adventure-tab">
      <div className={`adventure-nav`}>
        {game.biomes.map((biome, index) => (
          <button
            className={`adventure-nav-section ${
              activeTab === biome.name ? "active" : ""
            }`}
            onClick={() => openBiome(biome.name)}
            key={index}
          >
            {biome.name}
          </button>
        ))}
      </div>
      <div className="adventure-body">
        {activeTab === "" && <div>Click a biome to begin</div>}
        {activeTab === "snow" && (
          <Biome
            setGame={setGame}
            game={game}
            biomeData={game.biomes[0]}
            biomeIndex={0}
          />
        )}
      </div>
    </div>
  );
};

export default AdventureTabs;
