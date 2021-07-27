import React, {SyntheticEvent, useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import API from "../../../API/API";
import axios from "axios";


type RenderChangePasswordProps = {
    activeChannelID: number;
}

function RenderChangePassword(props : RenderChangePasswordProps){
    const [givenPassword, setGivenPassword] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [renderPasswordBox, setRenderPasswordBox] = useState(false);
    const [newPassword, setNewPassword] = useState('')
    const [redirect, setRedirect] = useState(false );
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
        const checkIsPrivate = async () => {
            try {
                const {data} = await API.Channels.getOne(props.activeChannelID)
                setIsPrivate(data.IsPrivate);
            }catch (err) {setUnauthorized(true);}
        }
        checkIsPrivate()
    },[props.activeChannelID])

    async function retrievePassword()
    {
        try {
            const {data} = await API.Channels.login(givenPassword, props.activeChannelID)
            return data;
        }catch (err) {setUnauthorized(true);}
    }

    async function verifyPassword()
    {
        try {
            const password = await retrievePassword()
            if (password === true) {
                setRenderPasswordBox(true)
                setInvalid(false);
            }
            else
            {
                setInvalid(true);
            }
        } catch (err) {setUnauthorized(true);}
    }

    let submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await API.Channels.changePassword(newPassword, props.activeChannelID);
            setRedirect(true);
        }catch (err) {setUnauthorized(true);}
    }

    function renderNewPasswordBox() {
        if (renderPasswordBox) {
            return (
                <div className="form-floating">
                    <label htmlFor="floatingInput">New Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                           onChange={e => setNewPassword(e.target.value)}/>
                    <button  type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
                </div>
            )
        }
        else
            return ;
    }

    if (unauthorized)
        return <Redirect to={'/'}/>;

    if(redirect) {
        return <Redirect to={'/chat'}/>;
    }

    if (isPrivate) {
        return (
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Old Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                       onChange={e => setGivenPassword(e.target.value)}/>
                <button type="submit" className="btn btn-primary" onClick={verifyPassword} >Submit oldpassword</button>
                {   invalid?
                    <p className="registerSubTitle">Wrong password try another</p>
                    :
                    <p/>  }
                {renderNewPasswordBox()}
            </div>
        )
    }
    else {
        return (
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"
                       onChange={() => setRenderPasswordBox(true)}
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                    Add password to channel
                </label>
                {renderNewPasswordBox()}
            </div>
        )
        }
    }

export default RenderChangePassword;
