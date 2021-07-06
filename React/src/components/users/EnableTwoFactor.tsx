import React, {SyntheticEvent, useEffect, useState} from "react";
import axios from 'axios';

import './stylesheets/TwoFactor.css'
import logo from "./img/42_logo.svg";
import {Redirect} from "react-router-dom";


const EnableTwoFactor = () => {
    const [QRCode, setQRCode] = useState(' ');
    const [code, setCode] = useState(' ');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const getQRcode = async () => {
            const {data} = await axios.post('2fa/generate', { responseType: 'arraybuffer' })
            console.log(data);
            setQRCode(data);
        }
        getQRcode();
    }, []);

    const submit = async (e: SyntheticEvent) => {
        // e.preventDefault();
        //
        // await axios.put('2fa/generate', {
        //     code: code,
        // });
        //
        // setRedirect(true); //check if successfull first
    }

    if (redirect)
        return <Redirect to={'/update'}/>

    return (
        <main className="TwoFactor_component">
            <form onSubmit={submit}>
                <img className="mb-4" src={logo} alt="logo" width="72" height="57"/>
                <h1 className="h3 mb-3 fw-normal">Enable Two Factor authentication</h1>

                <div>{QRCode}</div>

                <div className="form-floating">
                    <input required className="form-control" id="floatingInput" placeholder="12345"
                           onChange={e => setCode(e.target.value)}/>
                    <label htmlFor="floatingInput">authentication code</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
        </main>
    )

}

export default EnableTwoFactor