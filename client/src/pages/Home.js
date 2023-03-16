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
  const [initialized, setInitialized] = useState(false);
  const [score, setScore] = useState(0);
  const {
    loading,
    error: error2,
    data: gameData,
  } = useQuery(GET_GAME);

  const updateScore = async (score) => {
    setScore(score);
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
        console.error(e);
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, [score]);

  if (loading){
    console.log('loading');
    return 'Loading...';
  }
  else if (error2){ return 'ERROR!';}
  else{
    if (!initialized){
      setScore(gameData.game.score);
      setInitialized(true);
    }
    return (
    <div className="home-page">
      <Navbar />
      <Clicker onInputChange={updateScore} score={score} /> 
      
      <div className="home-divider"></div>
       <Dashboard score={score} />
    </div>
  );
}
}
export default Home;
