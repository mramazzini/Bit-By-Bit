import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Navbar from "../components/global/Navbar";
import Clicker from "../components/home/Clicker";
import Dashboard from "../components/home/Dashboard";
import "../styles/Home.css";
import { UPDATE_GAME } from "../components/utils/mutations";
import { GET_GAME } from "../components/utils/queries";

function Home() {
  const [updateGame, { error }] = useMutation(UPDATE_GAME);

  const [score, setScore] = useState();
  const {
    loading,
    error: error2,
    data: gameData,
  } = useQuery(GET_GAME, {
    onCompleted: (data) => {
      setScore(data.game.score);
      console.log(data.game);
    },
  });
  const updateScore = async (score) => {
    setScore(score);
  };
  const getScore = async () => {
    try {
      const data = await gameData;
      return await gameData.game.score;
    } catch (e) {
      console.log(e);
      return 0;
    }
  };

  //AutoSave game every 30 seconds into database
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        await updateGame({
          variables: {
            score: score,
          },
        });
        console.log("Game Autosaved!");
      } catch (e) {
        console.error("Error Autosaving");
        console.error(error);
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, [score]);

  return (
    <div className="home-page">
      <Navbar />
      <Clicker onInputChange={updateScore} score={getScore} />
      <div className="home-divider"></div>
      {loading ? <div>Loading...</div> : <Dashboard score={score} />}
    </div>
  );
}
export default Home;
