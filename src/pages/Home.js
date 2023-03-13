import React from "react";
import Navbar from "../components/global/Navbar";
import Clicker from "../components/home/Clicker";
import '../styles/Home.css';

function Home(){
    return(
        <div className = 'home-page'>
            <Navbar />
            <Clicker/>
            
        </div>
    )
}
export default Home;