import React, {useEffect, useRef, useState} from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import logo from "./img/42_logo.svg"
import './stylesheets/WaitingRoom.css'

const WaitingRoom = (props: any) => {
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
            catch(err){if(mounted) setUnauthorized(true);}
        }
        authorization();
        return () => {mounted = false;}
    }, []);

    useEffect(() => {
        let mounted = true;
        const getUser = async () => {
            try {
                const {data} = await axios.get('userData')
                if (mounted) setUser(data);
            }
            catch(err){if(mounted) setUnauthorized(true);}
        }
        getUser();
        return () => {mounted = false;}
    }, []);


    const websocket: any = useRef<WebSocket>(null);

    useEffect(() => {
        let mounted = true;

        if (props.location.state === "classic")// get form url
            websocket.current = new WebSocket("ws://localhost:8000/classicWaitingRoom");
        else if ((props.location.state === "deluxe"))
            websocket.current = new WebSocket("ws://localhost:8000/deluxeWaitingRoom");
        else if ((props.location.state === "private"))
            websocket.current = new WebSocket("ws://localhost:8000/privateWaitingRoom");

        websocket.current.onopen = () => {
            if (user.id) {
                if (props.location.state === "classic") {
                    const classicPlayer = JSON.stringify({event: "newPlayer", data: [user.id, "classic"]});
                    websocket.current.send(classicPlayer);
                }
                else if (props.location.state === "deluxe") {
                    let deluxePlayer = JSON.stringify({event: "newPlayer", data: [user.id, "deluxe"]});
                    websocket.current.send(deluxePlayer);
                }
                else if (props.location.state === "private")  {
                    let privatePlayer = JSON.stringify({event: "newPlayer", data: [user.id, "private"]});
                    websocket.current.send(privatePlayer);
                }
            }
        };

        websocket.current.onclose = () => { };

        websocket.current.addEventListener("message", function (event: any) {
            const object = JSON.parse(event.data);

            if (object.event === "newPlayer") {
                // websocket.current.close();
                if (mounted) setRedirectURL(object.data.gameURL);
                if (mounted) setGameData(object.data);
                if (mounted) setStartGame(true);
            }

            if (object.event === "duplicateClient") {
                // websocket.current.close();
                if (mounted) setRedirectURL(object.data.URL);
                if (mounted) setProfilePage(true);
            }

        });

        return () => {
            websocket.current.close();
            mounted = false;
        };
    }, [user, props.location.state]);


    if (unauthorized)
        return <Redirect to={'/'} />;

    if (startGame)
        return <Redirect to={{pathname: redirectURL, state: {gameData} }} />;

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
