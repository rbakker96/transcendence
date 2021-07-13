import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import logo from "./img/42_logo.svg"
import './stylesheets/WatchGame.css'

const WatchGame = () => {

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
                <h1 className="h3 mb-3 fw-normal register_title">Relax and watch a game!</h1>

                <div className="activeGames">
                    <div className="gameLink">
                        <p>#1</p>
                        <p>-gameURL-</p>
                    </div>

                    <div className="gameLink">
                        <p>#2</p>
                        <p>-gameURL-</p>
                    </div>

                    <div className="gameLink">
                        <p>#3</p>
                        <p>-gameURL-</p>
                    </div>

                    <div className="gameLink">
                        <p>#4</p>
                        <p>-gameURL-</p>
                    </div>

                    <div className="gameLink">
                        <p>#5</p>
                        <p>-gameURL-</p>
                    </div>

                    <div className="gameLink">
                        <p>#6</p>
                        <p>-gameURL-</p>
                    </div>

                    <div className="gameLink">
                        <p>#7</p>
                        <p>-gameURL-</p>
                    </div>

                </div>

            </div>
        </main>
    )
}

export default WatchGame
