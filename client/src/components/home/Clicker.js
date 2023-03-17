import React from "react";
import "../../styles/Home.css";
function Clicker(props) {
  const [score, setScore] = React.useState(props.score);

  const updateScore = () => {
    setScore(score + 1);
    props.onInputChange(score);
  };

  return (
    <div className="clicker-body">
      <div className="clicker-score">{props.score}</div>
      <div className="clicker" onClick={updateScore}></div>
    </div>
  );
}
export default Clicker;
