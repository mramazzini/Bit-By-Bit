import React from "react";
import "../../styles/Home.css";
import useSound from "use-sound";
import boopSfx from "../../assets/boop.wav";

function Clicker(props) {
  const [isActive, setIsActive] = React.useState(false);
  const [mute, setMute] = React.useState(false);

  const [play] = useSound(boopSfx);
  const updateScore = async () => {
    //Sound
    if (!mute) {
      play();
    }

    //Score

    //update score in parent component
    await props.onInputChange(props.score + 1 * props.clickMultiplier);

    //Animation
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 100);
  };

  return (
    <div className="clicker-body">
      <div className="clicker-score">{props.score}</div>
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
