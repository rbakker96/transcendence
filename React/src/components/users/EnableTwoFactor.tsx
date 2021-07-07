import React, {SyntheticEvent, useEffect, useState} from "react";
import axios from 'axios';

import './stylesheets/EnableTwoFactor.css'
import logo from "./img/42_logo.svg";
import {Redirect} from "react-router-dom";


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

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const ret = await axios.post('2fa/verify', {
            code: code,
        });

        if (ret)
            setRedirect(true); //check if successfull first
    }

    if (redirect)
        return <Redirect to={'/update'}/>

    return (
        <main className="EnableTwoFactor_component">
            <form onSubmit={submit}>
                <img className="mb-4" src={logo} alt="logo" width="72" height="57"/>
                <h1 className="h3 mb-3 fw-normal enableTitle">Enable Two Factor authentication</h1>
                <p className="enableSubTitle">Scan this QR-code with the Google Authenticator app</p>

                <div><img className="qrImg" src={QRCode}/></div>

                <p className="enableSubTitle">Enter the access code generated in the app</p>

                <div className="form-floating">
                    <input required className="form-control" id="floatingInput" placeholder="12345"
                           onChange={e => setCode(e.target.value)}/>
                    <label htmlFor="floatingInput">authentication code</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Enable</button>
            </form>
        </main>
    )

}

export default EnableTwoFactor