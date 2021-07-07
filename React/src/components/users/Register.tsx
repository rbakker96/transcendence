import React, {SyntheticEvent, useEffect, useState} from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import logo from "./img/42_logo.svg"
import './stylesheets/Register.css'

const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [unauthorized, setUnauthorized] = useState(false);
    const [invalid, setInvalid] = useState(false);

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
            await axios.post('register', {
                username, email, phonenumber,
            })
            setRedirect(true);
            setInvalid(false);
        }
        catch (err) {
            setInvalid(true);
        }
    }

    if (unauthorized)
        return <Redirect to={'/'}/>;

    if (redirect)
        return <Redirect to={'/profile'}/>;

    return (
        <main className="Register_component">
            <form onSubmit={submit}>
                <img className="mb-4" src={logo} alt="./img/42_logo.svg" width="72" height="57"/>
                <h1 className="h3 mb-3 fw-normal register_title">Please register</h1>

                {   invalid?
                        <p className="registerSubTitle">Wrong input values, please try again</p>
                    :
                        <p/>  }

                <div className="form-floating">
                    <input required className="form-control" id="floatingInput"
                           onChange={e => setUsername(e.target.value)}/>
                    <label htmlFor="floatingInput">User name</label>
                </div>

                <div className="form-floating">
                    <input required type="email" className="form-control" id="floatingInput"
                           onChange={e => setEmail(e.target.value)}/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>

                <div className="form-floating">
                    <input required className="form-control" id="floatingPassword"
                           onChange={e => setPhonenumber(e.target.value)}/>
                    <label htmlFor="floatingPassword">Phonenumber</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
        </main>
    )
}

export default Register
