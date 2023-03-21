import React from "react";
import "../../../styles/Biome.css";
import Farm from "./Farm";

const Biome = ({ biomeData }) => {
  const { farms, name } = biomeData;

  const formatFarmName = (name) => {
    const words = name.split("_");
    // Remove the first word from the array
    words.shift();
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  return (
    <div className={name}>
      {farms.map((farm, index) => {
        const formattedName = formatFarmName(farm.name);
        return (
          <Farm
            key={index}
            biome={name}
            upgrade={{
              name: formattedName,
              description: farm.description,
              cost: farm.cost,
            }}
          />
        );
      })}
    </div>
  );
};

export default Biome;
