import React from "react";
import "../../../styles/Biome.css";
import Farm from "./Farm";
import CurrencyConverter from "./CurrencyConverter";
const Biome = ({ biomeData, score, updateScore }) => {
  const { farms, name, currency } = biomeData;
  const [currencyAmount, setCurrencyAmount] = React.useState(currency.amount);
  const formatFarmName = (name) => {
    const words = name.split("_");
    // Remove the first word from the array
    words.shift();
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  const updateCurrencyAmount = () => {
    setCurrencyAmount(currencyAmount - 1);
    updateScore(score + currency.conversion_rate);
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
            <span className="biome-side-menu-body-title">{currency.name}s</span>
            <span className="biome-side-menu-amountPerSecond">
              per second: <br />
              {currency.amount_per_second}
            </span>
            Amount: <br />
            {currencyAmount}
          </div>
          <div className="biome-side-menu-conversion-rate">
            1 {currency.name} : {currency.conversion_rate} points
          </div>
          <CurrencyConverter
            updateCurrencyAmount={updateCurrencyAmount}
            biome_currency={currency.name}
            currency_amount={currencyAmount}
          />
        </div>
      </div>
    </div>
  );
};

export default Biome;
