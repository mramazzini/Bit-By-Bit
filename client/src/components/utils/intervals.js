const autosave = async (game, updateGame, setGame, gameData) => {
  try {
    if (!game) {
      console.log("Game not initialized, skipping autosave");
      setGame(gameData.game);
      return;
    }

    console.log(game);
    console.log("Autosaving...");
    await updateGame({
      variables: {
        GameInput: game,
      },
    });
    console.log("Game Autosaved!");
  } catch (e) {
    console.error("Error Autosaving");
    console.error(e);
  }
};

const updateScoreValues = (game) => {
  let updateGame = {
    ...game,
    biomes: game.biomes.map((biome) => {
      return {
        ...biome,
        currency: {
          ...biome.currency,
          amount:
            biome.currency.amount + biome.currency.amount_per_second / 100,
        },
      };
    }),
  };

  return updateGame;
};
const functions = { autosave, updateScoreValues };
export default functions;
