import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Navbar from "../components/global/Navbar";
import Clicker from "../components/home/Clicker";
import Dashboard from "../components/home/Dashboard";
import "../styles/Home.css";
import { UPDATE_GAME } from "../components/utils/mutations";
import { GET_GAME } from "../components/utils/queries";

function Home() {
  const [updateGame] = useMutation(UPDATE_GAME);
  const [game, setGame] = useState();
  const [initialized, setInitialized] = useState(false);

  const { loading, error, data: gameData } = useQuery(GET_GAME);

  //AutoSave game every 30 seconds into database
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        if (!game) {
          console.log("Game not initialized, skipping autosave");
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
    }, 15000);
    console.log("Autosave interval set");
    return () => clearInterval(intervalId);
  }, [setGame]);

  if (loading) {
    return "Loading...";
  } else if (error) {
    return "Error, try refreshing the page";
  } else {
    if (gameData && gameData.game && !initialized) {
      setInitialized(true);

      setGame(gameData.game);
    }

    return (
      <div className="home-page">
        <Navbar />
        <Clicker setGame={setGame} game={game} />

        <div className="home-divider"></div>
        <Dashboard setGame={setGame} game={game} />
      </div>
    );
  }
}
export default Home;
