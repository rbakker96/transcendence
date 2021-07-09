import React, {SyntheticEvent, useEffect, useState} from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';

import './stylesheets/EnableTwoFactor.css'
import logo from "./img/42_logo.svg";


const EnableTwoFactor = () => {
    const [QRCode, setQRCode] = useState(' ');
    const [code, setCode] = useState(' ');
    const [redirect, setRedirect] = useState(false);
    const [invalid, setInvalid] = useState(false);
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

    useEffect(() => {
        const getQRcode = async () => {
            const {data} = await axios.get('2fa/generate')
            setQRCode(data.url);
        }
        getQRcode();
    }, []);

    const enable = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.post('2fa/verify', { code: code,} );
            setRedirect(true);
        }
        catch (err) { setInvalid(true); }
    }

    const disable = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('2fa/disable', {});
        setRedirect(true);
    }

    if (unauthorized)
        return <Redirect to={'/'}/>;

    if (redirect)
        return <Redirect to={'/update'}/>

    return (
        <main className="EnableTwoFactor_component">
            <form>
                <img className="mb-4" src={logo} alt="logo" width="72" height="57"/>
                <h1 className="h3 mb-3 fw-normal enableTitle">Enable Two Factor authentication</h1>
                <p className="enableSubTitle">Scan this QR-code with the Google Authenticator app</p>

                <div><img className="qrImg" alt="QRcode" src={QRCode}/></div>

                {   invalid?
                    <p className="faSubTitle">Wrong validation code, please try again</p>
                    :
                    <p/>  }

                <div className="form-floating">
                    <input required className="form-control" id="floatingInput" placeholder="12345"
                           onChange={e => setCode(e.target.value)}/>
                    <label htmlFor="floatingInput">Enter authentication code</label>
                </div>

                <p className="enableText">User policy - Be aware that you need to scan this QR-code if you</p>
                <p className="enableText">want to use this service OR continue using this service. Previously saved</p>
                <p className="enableText">settings in the Google Authenticator app are expired and no longer valid.</p>


                <button onClick={enable} className="w-100 btn btn-lg btn-primary" type="button">Enable</button>
                <button onClick={disable} className="w-100 btn btn-lg btn-primary" type="button">Disable</button>
            </form>
        </main>
    )

}

export default EnableTwoFactor
