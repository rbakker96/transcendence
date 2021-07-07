import React, {Component, SyntheticEvent, useEffect, useState} from "react";
import axios from 'axios';

import './stylesheets/TwoFactor.css'
import logo from "./img/42_logo.svg";
import {Redirect} from "react-router-dom";


const LoginTwoFactor = () => {
    const [code, setCode] = useState(' ');
    const [loginFailure, setLoginFailure] = useState(false);
    const [redirect, setRedirect] = useState(false);
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

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.post('2fa/login', { code: code,});
            setRedirect(true);
            setLoginFailure(false);
        }
        catch (err) {
            setLoginFailure(true);
        }
    }

    if (unauthorized)
        return <Redirect to={'/'}/>;

    if (redirect)
        return <Redirect to={'/profile'}/>

    return (
        <main className="TwoFactor_component">
            <form onSubmit={submit}>
                <img className="mb-4" src={logo} alt="logo" width="72" height="57"/>
                <h1 className="h3 mb-3 fw-normal">Please enter validation code</h1>

                {   loginFailure?
                    <p className="faSubTitle">Wrong validation code, please try again</p>
                    :
                    <p/>  }

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

export default LoginTwoFactor
