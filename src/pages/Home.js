import React from "react";
import Navbar from "../components/global/Navbar";
import Clicker from "../components/home/Clicker";
import '../styles/Home.css';

function Home(){

    const updateScore = (score) => {
        console.log(score);
    }

    return(
        <div className = 'home-page'>
            <Navbar />
            <Clicker onInputChange={updateScore}/>
            <div className = 'home-divider'></div>
        </div>
    )
}
export default Home;