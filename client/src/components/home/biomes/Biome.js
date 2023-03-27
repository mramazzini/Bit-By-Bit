import React from "react";
import "../../../styles/Biome.css";
import Farm from "./Farm";
import CurrencyConverter from "./CurrencyConverter";
import Game from "../../utils/Game";
const Biome = ({ game, setGame, biomeIndex }) => {
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

  return (
    <div className={game.biomes[biomeIndex].name}>
      {game.biomes[biomeIndex].farms.map((farm, index) => {
        const formattedName = formatFarmName(farm.name);
        return (
          <Farm
            key={index}
            biome={game.biomes[biomeIndex].name}
            upgrade={{
              formattedName: formattedName,
              name: farm.name,
              description: farm.description,
              cost: farm.cost,
              level: farm.level,
              flavor: farm.flavor,
              base_amount_per_second: farm.base_amount_per_second,
            }}
            setGame={setGame}
            game={game}
          />
        );
      })}
      <div className={`biome-side-menu theme-${game.biomes[biomeIndex].name}`}>
        <div className="biome-side-menu-header">Converter</div>
        <div
          className={`upgrade-image ${game.biomes[biomeIndex].name}-upgrade-image`}
        ></div>
        <div className="biome-side-menu-body">
          <div className="biome-side-menu-amount">
            <span className="biome-side-menu-body-title">
              {game.biomes[biomeIndex].currency.name}s
            </span>
            <span className="biome-side-menu-amountPerSecond">
              per second: <br />
              {game.biomes[biomeIndex].currency.amount_per_second}
            </span>
            Amount: <br />
            {game.biomes[biomeIndex].currency.amount.toFixed(0)}
          </div>
          <div className="biome-side-menu-conversion-rate">
            1 {game.biomes[biomeIndex].name} :{" "}
            {game.biomes[biomeIndex].currency.conversion_rate} points
          </div>
          <CurrencyConverter
            updateCurrencyAmount={transferCurrencyToPoints}
            biome_currency={game.biomes[biomeIndex].currency.name}
            currency_amount={parseInt(
              game.biomes[biomeIndex].currency.amount,
              10
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Biome;
