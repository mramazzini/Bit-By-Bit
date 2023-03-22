import React from "react";
import "../../../styles/Biome.css";
import Farm from "./Farm";
import CurrencyConverter from "./CurrencyConverter";
const Biome = ({ biomeData, score, updateScore }) => {
  console.log(biomeData);
  const { farms, name, currency } = biomeData;

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
              formattedName: formattedName,
              name: farm.name,
              description: farm.description,
              cost: farm.cost,
              level: farm.level,
              flavor: farm.flavor,
            }}
            score={score}
            updateScore={updateScore}
          />
        );
      })}
      <div className={`biome-side-menu theme-${name}`}>
        <div className="biome-side-menu-header">Converter</div>
        <div className={`upgrade-image ${name}-upgrade-image`}></div>
        <div className="biome-side-menu-body">
          <div className="biome-side-menu-amount">
            {currency.amount} {currency.name}
          </div>
          <div className="biome-side-menu-conversion-rate">
            {currency.conversion_rate} {currency.name} : 1 point
          </div>
          <CurrencyConverter />
        </div>
      </div>
    </div>
  );
};

export default Biome;
