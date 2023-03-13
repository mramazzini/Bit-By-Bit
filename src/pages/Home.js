import React from "react";
import Navbar from "../components/global/Navbar";
import Clicker from "../components/home/Clicker";
import Dashboard from "../components/home/Dashboard";
import '../styles/Home.css';



function Home(){
    const [score, setScore] = React.useState(0);
    const updateScore = (score) => {
        setScore(score+1);
    }

    return(
        <div className = 'home-page'>
            <Navbar />
            <Clicker onInputChange={updateScore}/>
            <div className = 'home-divider'></div>
            <Dashboard score={score}/>
        </div>
    )
}
export default Home;