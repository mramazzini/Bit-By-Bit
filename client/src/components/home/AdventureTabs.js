import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BIOMES } from "../utils/queries";
import Snow from "./Biomes/Snow";
const AdventureTabs = () => {
  const { loading, error, data } = useQuery(GET_BIOMES);
  const [activeTab, setActiveTab] = useState("");

  const openBiome = (biomeName) => {
    setActiveTab(biomeName);
  };

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
          {activeTab === "snow" && <Snow />}
        </div>
      </div>
    );
  }
};

export default AdventureTabs;
