import React, { useEffect, useState} from "react";
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

import logo from "./img/42_logo.svg"
import './stylesheets/PlayGame.css'

const PlayGame = () => {

    const [unauthorized, setUnauthorized] = useState(false);

    useEffect(() => {
        let mounted = true;

        const authorization = async () => {
            try { await axios.get('userData'); }
            catch(err){
                if(mounted)
                    setUnauthorized(true);
            }
        }
        authorization();
        return () => {mounted = false;}
    }, []);


    if (unauthorized)
        return <Redirect to={'/'}/>;

    return (
        <main className="PlayGame_component">
            <div className="gameInfo">
                <img className="mb-4" src={logo} alt="logoGame" width="72" height="57"/>
                <h1 className="h3 mb-3 fw-normal register_title">Let's play a game!</h1>

                <p className="gameDesc">Pong is a two-dimensional sports game that simulates table tennis. The player controls an in-game paddle by moving it vertically across the left or right side of the screen. They can compete against another player controlling a second paddle on the opposing side. Players use the paddles to hit a ball back and forth.</p>

                <div className="buttonsDiv">
                    <p className="test">The clasic pong is whitout any powerups. First to 10 wins!</p>
                    <Link to="/WaitingRoom" type="button" className="w-100 btn btn-lg btn-primary">Play classic pong</Link>
                </div>
                <div className="buttonsDiv">
                    <p>The deluxe pong is with two powerups, each powerup can be used 3 times. First to 10 wins!</p>
                    <Link to="/profile" type="button" className="w-100 btn btn-lg btn-primary">Play deluxe pong</Link>
                </div>
            </div>
        </main>
    )
}

export default PlayGame