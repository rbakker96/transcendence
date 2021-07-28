import React, { useEffect, useState } from "react";
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

import logo from "./img/42_logo.svg"
import './stylesheets/WatchGame.css'
import {GameModel} from "../../models/Game.model";

const WatchGame = () => {
    const [games, setGames] = useState([]);
    const [unauthorized, setUnauthorized] = useState(false);

    useEffect(() => {
        let mounted = true;

        const authorization = async () => {
            try { await axios.get('userData'); }
            catch(err){if(mounted) setUnauthorized(true);}
        }
        authorization();
        return () => {mounted = false;}
    }, []);


    useEffect(() => {
        let mounted = true;

        const getGames = async () => {
            try {
                const {data} = await axios.get('/allGameData');
                if (mounted) setGames(data);
            }
            catch(err){if(mounted) setUnauthorized(true);}
        }
        getGames();
        return () => {mounted = false;}
    }, []);


    if (unauthorized)
        return <Redirect to={'/'}/>;

    return (
        <main className="PlayGame_component">
            <div className="gameInfo">
                <img className="mb-4" src={logo} alt="logoGame" width="72" height="57"/>
                <h1 className="h3 mb-3 fw-normal register_title">Relax and watch a game!</h1>

                <table>
                    <thead>
                        <tr>
                            <th>GAME ID</th>
                            <th>Game link</th>
                        </tr>
                    </thead>
                    <tbody>
                    {games.filter((game: GameModel) => game.active).map((gameData: GameModel) =>
                        <tr key={gameData.gameID}>
                            <td>#{gameData.gameID}</td>
                            <td><Link to={{pathname:gameData.gameURL, state: {gameData}}}>---- Watch this game ----</Link></td>
                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
        </main>
    )
}

export default WatchGame
