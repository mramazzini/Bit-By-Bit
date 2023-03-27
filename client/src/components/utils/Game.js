class Game {
  transferCurrency(game, biomeIndex) {
    if (game.biomes[biomeIndex].currency.amount < 1) {
      console.log("Not enough currency to transfer");
      return game;
    }
    return {
      ...game,
      score: game.score + game.biomes[biomeIndex].currency.conversion_rate,
      biomes: game.biomes.map((biome, index) => {
        if (index === biomeIndex) {
          return {
            ...biome,
            currency: {
              ...biome.currency,
              amount: game.biomes[biomeIndex].currency.amount - 1,
            },
          };
        }
        return biome;
      }),
    };
  }
  purchaseUpgrade(game, upgrade_name, biome_data, farm_data) {
    //purchases the upgrade and returns the updated game object

    //find the index of the upgrade in the game.upgrades array
    const upgradedIndex = game.upgrades.findIndex(
      (upgrade) => upgrade.name === upgrade_name
    );
    //Check if user can afford the upgrade
    if (game.score < game.upgrades[upgradedIndex].price) {
      console.log("Not enough money");
      return game;
    }
    let updatedGame = {
      ...game,
      score: game.score - game.upgrades[upgradedIndex].price,
      upgrades: [
        ...game.upgrades.slice(0, upgradedIndex),
        {
          ...game.upgrades[upgradedIndex],
          status: "purchased",
        },
        ...game.upgrades.slice(upgradedIndex + 1),
      ],
    };

    //Check if the upgrade unlocks any new upgrades
    updatedGame.upgrades[upgradedIndex].unlocks.forEach((name) => {
      const unlockedIndex = updatedGame.upgrades.findIndex(
        (upgrade) => upgrade.name === name
      );

      updatedGame = {
        ...updatedGame,
        upgrades: [
          ...updatedGame.upgrades.slice(0, unlockedIndex),
          {
            ...updatedGame.upgrades[unlockedIndex],
            status: "shown",
          },
          ...updatedGame.upgrades.slice(unlockedIndex + 1),
        ],
      };
    });

    //check type of upgrade and apply effects

    //Biome unlock
    if (
      updatedGame.upgrades[upgradedIndex].effect.substring(0, 12) ===
      "biome_unlock"
    ) {
      const biome_name =
        updatedGame.upgrades[upgradedIndex].effect.substring(13);
      //match the biome name to the biome object
      const biome = biome_data.find((biome) => biome.name === biome_name);
      updatedGame = {
        ...updatedGame,
        biomes: [...updatedGame.biomes, biome],
      };

      //Click multiplier
    } else if (
      updatedGame.upgrades[upgradedIndex].effect.substring(0, 16) ===
      "click_multiplier"
    ) {
      const multiplier =
        updatedGame.upgrades[upgradedIndex].effect.substring(17);
      updatedGame = {
        ...updatedGame,
        click_multiplier: updatedGame.click_multiplier * multiplier,
      };
    }
    //Farm unlock
    else if (
      updatedGame.upgrades[upgradedIndex].effect.substring(0, 11) ===
      "farm_unlock"
    ) {
      const farm_name =
        updatedGame.upgrades[upgradedIndex].effect.substring(12);
      //match the farm name to the farm object
      const biome_name = updatedGame.upgrades[upgradedIndex].effect.substring(
        12,
        16
      );
      console.log(farm_data);
      const farm = farm_data.find((farm) => farm.name === farm_name);

      updatedGame = {
        ...updatedGame,
        biomes: updatedGame.biomes.map((biome) => {
          if (biome.name === biome_name) {
            return {
              ...biome,
              farms: [...biome.farms, farm],
            };
          }

          return biome;
        }),
      };
    }

    return updatedGame;
  }
  upgradeFarm(upgrade, biome_name, game) {
    //find the index of the biome in the game.biomes array
    const biomeIndex = game.biomes.findIndex(
      (biome) => biome.name === biome_name
    );
    //find the index of the farm in the game.biomes.farms array
    const farmIndex = game.biomes[biomeIndex].farms.findIndex(
      (farm) => farm.name === upgrade.name
    );
    //Check if user can afford the upgrade
    if (game.score < upgrade.cost) {
      console.log("Not enough money");
      return game;
    }
    const getAmountPerSecond = (biome) => {
      let amount = 0;
      biome.farms.forEach((farm) => {
        amount += farm.level * (farm.base_amount_per_second || 0);
      });

      return amount;
    };
    //Update score, farm level, farm cost, and biome amount_per_second
    let updatedGame = {
      ...game,
      score: game.score - upgrade.cost,
      biomes: game.biomes.map((biome, index) => {
        if (index === biomeIndex) {
          return {
            ...biome,
            farms: [
              ...biome.farms.slice(0, farmIndex),
              {
                ...biome.farms[farmIndex],
                level: biome.farms[farmIndex].level + 1,
                cost: Math.floor(biome.farms[farmIndex].cost * 1.15),
              },
              ...biome.farms.slice(farmIndex + 1),
            ],
            currency: {
              ...biome.currency,
              amount_per_second: getAmountPerSecond(biome),
            },
          };
        }
        return biome;
      }),
    };

    return updatedGame;
  }
}

export default new Game();
