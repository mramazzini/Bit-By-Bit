import React, { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Navbar from "../components/global/Navbar";
import Clicker from "../components/home/Clicker";
import Dashboard from "../components/home/Dashboard";
import "../styles/Home.css";
import { UPDATE_GAME } from "../components/utils/mutations";
import { GET_GAME } from "../components/utils/queries";
import functions from "../components/utils/intervals";
const { autosave, updateScoreValues } = functions;
function Home() {
  const [updateGame] = useMutation(UPDATE_GAME);
  const [game, setGame] = useState();
  const [initialized, setInitialized] = useState(false);
  const updateCount = useRef(0);
  const saving = useRef(false);
  const {
    loading,
    error,
    data: gameData,
  } = useQuery(GET_GAME, {
    fetchPolicy: "network-only",
  });
  const refreshGame = async (game) => {
    console.log("updating", game);
    await setGame(() => {
      return game;
    });
  };
  //AutoSave game every 30 seconds into database

  useEffect(() => {
    if (!game) {
      console.log("Game not initialized, skipping autosave");
      return;
    }

    const gameUpdateTimerId = setInterval(async () => {
      if (!saving.current && updateCount.current % 6000 === 0) {
        saving.current = true;
        await autosave(game, updateGame, setGame, gameData);
        saving.current = false;
      }
      updateCount.current++;

      setGame(updateScoreValues(game));
    }, 10);

    return () => {
      clearInterval(gameUpdateTimerId);
    };
  }, [gameData, game]);

  if (loading) {
    return "Loading...";
  } else if (error) {
    return "Error, try refreshing the page";
  } else {
    if (gameData && gameData.game && !initialized) {
      setInitialized(true);

      setGame(gameData.game);
      console.log(game);
    }

    return (
      <div className="home-page">
        <Navbar />
        <Clicker setGame={refreshGame} game={game} />

        <div className="home-divider"></div>
        <Dashboard setGame={refreshGame} game={game} />
      </div>
    );
  }
}
export default Home;
