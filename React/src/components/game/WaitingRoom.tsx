import React, { useEffect, useState} from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import logo from "./img/42_logo.svg"
import './stylesheets/WaitingRoom.css'

const WaitingRoom = () => {

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