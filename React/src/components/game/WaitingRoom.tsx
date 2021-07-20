import React, {useEffect, useRef, useState} from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import logo from "./img/42_logo.svg"
import './stylesheets/WaitingRoom.css'

const WaitingRoom = () => {
    const [gameData, setGameData] = useState('');
    const [redirectURL, setRedirectURL] = useState('');
    const [startGame, setStartGame] = useState(false);
    const [profilePage, setProfilePage] = useState(false);
    const [unauthorized, setUnauthorized] = useState(false);
    const [user, setUser] = useState({username: '', id: 0,});

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

    useEffect(() => {
        const getUser = async () => {
            const {data} = await axios.get('userData')
            setUser(data);
            console.log(data);
        }
        getUser();
    }, []);


    const URL = "ws://localhost:8000/classicWaitingRoom";
    // const URL = `ws://localhost:8000/chat/${props.activeChannelID}`;
    const websocket: any = useRef<WebSocket>(null);

    useEffect(() => {
        websocket.current = new WebSocket(URL);

        websocket.current.onopen = () => {
            console.log("ws entered waitingRoom: ");

            if (user.id) {
                const playerData = {id: user.id};
                console.log(playerData);
                const newPlayer = JSON.stringify({event: "newClassicGamePlayer", data: playerData});
                websocket.current.send(newPlayer);
            }
        };

        websocket.current.onclose = () => {
            console.log("ws left waitingRoom ");
        };

        websocket.current.addEventListener("message", function (event: any) {
            const object = JSON.parse(event.data);
            if (object.event === "newClassicGamePlayer") {
                console.log("React: newClassicGamePlayer event triggered");
                setRedirectURL(object.data.gameURL);
                setGameData(object.data);
                setStartGame(true);
            }

            if (object.event === "newDeluxeGamePlayer") {
                console.log("React: newDeluxeGamePlayer event triggered");
            }

            if (object.event === "duplicateClient") {
                console.log("React: duplicateClient event triggered");
                setRedirectURL(object.data.URL);
                setProfilePage(true);
            }

        });

        return () => {
            websocket.current.close();
        };
    }, [user]);


    if (unauthorized)
        return <Redirect to={'/'} />;

    if (startGame)
        return <Redirect to={{pathname: redirectURL, state: {gameData} }} />;
        // return <GamePage Object={gameData}/>;

    if (profilePage)
        return <Redirect to={redirectURL}/>;

    return (
        <main className="WaitingRoom_component">
            <div className="WaitingScreen">

                <h1 className="h3 mb-3 fw-normal waiting_title">One moment please, we're connecting you with your opponent</h1>

                <img className="mb-4 App-logo" src={logo} alt="logoGame" width="100" height="80"/>

                <h1 className="h3 mb-3 fw-normal waiting_title">You will be automatically redirected </h1>

            </div>
        </main>
    )
}

export default WaitingRoom
