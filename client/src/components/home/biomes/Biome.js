import React from "react";
import "../../../styles/Biome.css";
import Farm from "./Farm";
import CurrencyConverter from "./CurrencyConverter";
import Game from "../../utils/Game";
const Biome = ({ biomeData, game, setGame, biomeIndex }) => {
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

  const transferCurrencyToPoints = async () => {
    let updateGame = Game.transferCurrency(game, biomeIndex);
    setGame(updateGame);
  };

  //Add a useEffect to update the currency amount per second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setGame({
        ...game,
        biomes: game.biomes.map((biome, index) => {
          if (index === biomeIndex) {
            return {
              ...biome,
              currency: {
                ...biome.currency,
                amount:
                  game.biomes[biomeIndex].currency.amount +
                  game.biomes[biomeIndex].currency.amount_per_second / 100,
              },
            };
          }
          return biome;
        }),
      });
    }, 10);
    return () => clearInterval(interval);
  }, [game]);

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
            setGame={setGame}
            game={game}
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
              {biomeData.currency.amount_per_second}
            </span>
            Amount: <br />
            {biomeData.currency.amount.toFixed(0)}
          </div>
          <div className="biome-side-menu-conversion-rate">
            1 {currency.name} : {currency.conversion_rate} points
          </div>
          <CurrencyConverter
            updateCurrencyAmount={transferCurrencyToPoints}
            biome_currency={biomeData.currency.name}
            currency_amount={parseInt(biomeData.currency.amount, 10)}
          />
        </div>
      </div>
    </div>
  );
};

export default Biome;
