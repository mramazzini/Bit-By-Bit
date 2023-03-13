import React from "react";
import '../../styles/Home.css';
function Clicker({ onInputChange }){

    const [score, setScore] = React.useState(0);

    const updateScore = () => {
        setScore(score + 1);
        onInputChange(score);
    }



    return(
        <div className = 'clicker-body'>
            <div className = 'clicker-score'>
                {score}
            </div>
            <div className = 'clicker' onClick={updateScore}>
                Click Me!
            </div>
        </div>
    )
}
export default Clicker;