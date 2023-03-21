import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BIOMES } from "../utils/queries";
import Biome from "./biomes/Biome";
const AdventureTabs = (refreshBiome) => {
  const { loading, error, data, refetch } = useQuery(GET_BIOMES);
  const ACTIVE_TAB_KEY = "activeTab";
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem(ACTIVE_TAB_KEY) || ""
  );

  const openBiome = (biomeName) => {
    setActiveTab(biomeName);
    localStorage.setItem(ACTIVE_TAB_KEY, biomeName);
  };

  refetch();
  if (loading) return <p>Loading...</p>;
  else if (error) return <p>Error</p>;
  else {
    const { biomes } = data;

    return (
      <div className="adventure-tab">
        <div className={`adventure-nav`}>
          {biomes.map((biome, index) => (
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
          {activeTab === "snow" && <Biome biomeData={biomes[0]} />}
        </div>
      </div>
    );
  }
};

export default AdventureTabs;
