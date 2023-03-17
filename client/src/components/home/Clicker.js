import React from "react";
import "../../styles/Home.css";

function Clicker(props) {
  const [score, setScore] = React.useState(props.score);
  const [isActive, setIsActive] = React.useState(false);
  const updateScore = () => {
    setScore(score + 1);
    props.onInputChange(score);
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
    </div>
  );
}
export default Clicker;
