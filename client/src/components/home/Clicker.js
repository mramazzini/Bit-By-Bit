import React, { useEffect } from "react";
import "../../styles/Home.css";
import useSound from "use-sound";
import boopSfx from "../../assets/boop.wav";

function Clicker({ setGame, game }) {
  const [isActive, setIsActive] = React.useState(false);
  const [mute, setMute] = React.useState(false);

  const [play] = useSound(boopSfx);

  const updateScore = () => {
    //Sound
    if (!mute) {
      play();
    }
    const updatedGame = {
      ...game,
      score: game.score + game.click_multiplier,
    };

    setGame(updatedGame);

    //Animation
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 100);
  };

  return (
    <div className="clicker-body">
      <div className="clicker-score">{game.score}</div>
      <div
        className={`clicker ${isActive ? "clicker-active" : ""}`}
        onClick={updateScore}
      ></div>
      <button className="mute-btn" onClick={() => setMute(!mute)}>
        Mute
      </button>
    </div>
  );
}
export default Clicker;
