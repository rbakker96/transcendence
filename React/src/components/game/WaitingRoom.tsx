import React, {useEffect, useRef, useState} from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import logo from "./img/42_logo.svg"
import './stylesheets/WaitingRoom.css'

const WaitingRoom = () => {
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
        }
        getUser();
    }, []);


    const URL = "ws://localhost:8000/WaitingRoom/1";
    // const URL = `ws://localhost:8000/chat/${props.activeChannelID}`;
    const websocket: any = useRef<WebSocket>(null);

    useEffect(() => {
        websocket.current = new WebSocket(URL);

        websocket.current.onopen = () => {
            console.log("ws entered waitingRoom: ");
        };

        websocket.current.onclose = () => {
            console.log("ws left waitingRoom ");
        };

        return () => {
            websocket.current.close();
        };
    }, []);




    if (unauthorized)
        return <Redirect to={'/'}/>;

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
