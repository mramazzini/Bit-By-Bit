import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import Navbar from "../components/global/Navbar";
import Clicker from "../components/home/Clicker";
import Dashboard from "../components/home/Dashboard";
import "../styles/Home.css";
import { UPDATE_GAME } from "../components/utils/mutations";

function Home() {
  const [updateGame, { error }] = useMutation(UPDATE_GAME);
  const [score, setScore] = React.useState(0);

  const updateScore = async (score) => {
    score += 1;
    setScore(score);
  };

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
    }, 30000);
    return () => clearInterval(intervalId);
  }, [score]);

  return (
    <div className="home-page">
      <Navbar />
      <Clicker onInputChange={updateScore} />
      <div className="home-divider"></div>
      <Dashboard score={score} />
    </div>
  );
}
export default Home;
