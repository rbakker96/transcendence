import React, {SyntheticEvent, useEffect, useState} from "react";
import UploadImg from "./UploadImg";
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

import logo from "./img/42_logo.svg";
import './stylesheets/Register.css'

const UpdateUser = () => {

    const [id, setId] = useState(0);
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [authentication, setAuthentication] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [unauthorized, setUnauthorized] = useState(false);
    const [invalid, setInvalid] = useState(false);

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
        const setDefaults = async () => {
            try {
                const {data} = await axios.get('userData')
                if(mounted) setId(data.id);
                if(mounted) setAvatar(data.avatar);
                if(mounted) setUsername(data.username);
                if(mounted) setEmail(data.email);
                if(mounted) setPhonenumber(data.phonenumber);
                if(mounted) setAuthentication(data.authentication);
            }
            catch(err){if(mounted) setUnauthorized(true);}
        }
        setDefaults();
        return () => {mounted = false;}
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.put('update', {
                id, avatar, username, email, phonenumber, authentication
            });
            setRedirect(true);
        }
        catch(err) { setInvalid(true); }
    }

    if (unauthorized)
        return <Redirect to={'/'}/>;

    if (redirect)
        return <Redirect to={'/profile'}/>

    return (
        <main className="Register_component">
            <form onSubmit={submit}>
                <img className="mb-4" src={logo} alt="logo" width="72" height="57"/>
                <h1 className="h3 mb-3 fw-normal register_title">Update your profile here</h1>

                {   invalid?
                    <p className="registerSubTitle">Wrong input values, please try again</p>
                    :
                    <p/>  }

                <div className="form-floating">
                    <input required className="form-control" id="floatingInput" placeholder="name@example.com"
                           defaultValue={username}
                           onChange={e => setUsername(e.target.value)}/>
                    <label htmlFor="floatingInput">User name</label>
                </div>

                <div className="form-floating">
                    <input required type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                           defaultValue={email}
                           onChange={e => setEmail(e.target.value)}/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>

                <div className="form-floating">
                    <input type="phonenumber" className="form-control" id="floatingPassword" placeholder="Password"
                           defaultValue={phonenumber}
                           onChange={e => setPhonenumber(e.target.value)}/>
                    <label htmlFor="floatingPassword">Phonenumber</label>
                </div>

                <div className="form-floating">
                    <input className="form-control" id="floatingPassword" placeholder="avatar"
                           defaultValue={avatar}
                           onChange={e => setAvatar(e.target.value)}/>
                    <UploadImg uploaded={setAvatar}/>
                    <label htmlFor="floatingPassword">Avatar</label>
                </div>

                <Link to="/enableTwoFactor" type="button" className="w-100 btn btn-lg btn-primary">Two Factor Auth settings</Link>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Update</button>

            </form>
        </main>
    )

}

export default UpdateUser
