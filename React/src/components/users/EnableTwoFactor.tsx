import React, {SyntheticEvent, useEffect, useState} from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';

import './stylesheets/EnableTwoFactor.css'
import logo from "./img/42_logo.svg";


const EnableTwoFactor = () => {
    const [QRCode, setQRCode] = useState(' ');
    const [code, setCode] = useState(' ');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const getQRcode = async () => {
            const {data} = await axios.get('2fa/generate')
            setQRCode(data.url);
        }
        getQRcode();
    }, []);

    const enable = async (e: SyntheticEvent) => {
        e.preventDefault();

        const ret = await axios.post('2fa/verify', {
            code: code,
        });

        if (ret)
            setRedirect(true); //check if successfull first
    }

    const disable = async (e: SyntheticEvent) => {
        e.preventDefault();

        const ret = await axios.post('2fa/disable', {});

        if (ret)
            setRedirect(true); //check if successfull first
    }

    if (redirect)
        return <Redirect to={'/update'}/>

    return (
        <main className="EnableTwoFactor_component">
            <form>
                <img className="mb-4" src={logo} alt="logo" width="72" height="57"/>
                <h1 className="h3 mb-3 fw-normal enableTitle">Enable Two Factor authentication</h1>
                <p className="enableSubTitle">Scan this QR-code with the Google Authenticator app</p>

                <div><img className="qrImg" src={QRCode}/></div>

                <div className="form-floating">
                    <input required className="form-control" id="floatingInput" placeholder="12345"
                           onChange={e => setCode(e.target.value)}/>
                    <label htmlFor="floatingInput">Enter authentication code to enable this service</label>
                </div>

                <button onClick={enable} className="w-100 btn btn-lg btn-primary" type="button">Enable</button>
                <button onClick={disable} className="w-100 btn btn-lg btn-primary" type="button">Disable</button>
            </form>
        </main>
    )

}

export default EnableTwoFactor