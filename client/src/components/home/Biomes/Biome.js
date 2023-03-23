import React from "react";
import "../../../styles/Biome.css";
import Farm from "./Farm";
import CurrencyConverter from "./CurrencyConverter";
const Biome = ({ biomeData, score, updateScore }) => {
  const { farms, name, currency } = biomeData;
  const [currencyAmount, setCurrencyAmount] = React.useState(() => {
    const storedCurrencyAmount = window.localStorage.getItem(
      `${name}-currencyAmount`
    );
    if (!storedCurrencyAmount) {
      return currency.amount;
    }
    return storedCurrencyAmount
      ? Number(storedCurrencyAmount)
      : currency.amount;
  });
  React.useEffect(() => {
    // Save the currencyAmount value to local storage when the component unmounts
    return () => {
      window.localStorage.setItem(`${name}-currencyAmount`, currencyAmount);
    };
  }, [name, currencyAmount]);
  const formatFarmName = (name) => {
    const words = name.split("_");
    // Remove the first word from the array
    words.shift();
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  const transferCurrencyToPoints = () => {
    setCurrencyAmount(currencyAmount - 1);
    updateScore(score + currency.conversion_rate);
  };

  //Add a useEffect to update the currency amount per second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrencyAmount(currencyAmount + currency.amount_per_second / 100);
    }, 10);
    return () => clearInterval(interval);
  }, [currencyAmount, currency.amount_per_second]);
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
            {currencyAmount.toFixed(0)}
          </div>
          <div className="biome-side-menu-conversion-rate">
            1 {currency.name} : {currency.conversion_rate} points
          </div>
          <CurrencyConverter
            updateCurrencyAmount={transferCurrencyToPoints}
            biome_currency={currency.name}
            currency_amount={parseInt(currencyAmount, 10)}
          />
        </div>
      </div>
    </div>
  );
};

export default Biome;
