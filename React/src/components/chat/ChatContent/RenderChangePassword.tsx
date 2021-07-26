import React, {SyntheticEvent, useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import API from "../../../API/API";
import axios from "axios";
import * as path from "path";


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

    useEffect(() => {
        const checkIsPrivate = async () => {
            const {data} = await API.Channels.getOne(props.activeChannelID)
            setIsPrivate(data.IsPrivate);
        }
        checkIsPrivate()
    },[])

    async function retrievePassword()
    {
        const {data} = await API.Channels.login(givenPassword, props.activeChannelID)
        return data;
    }

    async function verifyPassword()
    {
        const password = await retrievePassword()
        if (password === true) {
            setRenderPasswordBox(true)
            setInvalid(false);
        }
        else
        {
            setInvalid(true);
        }
    }

    let submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        console.log("wat is newpassword in submit", newPassword);
        await API.Channels.changePassword(newPassword, props.activeChannelID);
        setRedirect(true);
    }

    function renderNewPasswordBox() {
        if (renderPasswordBox === true) {
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

    if(redirect === true)
    {
        return <Redirect to={'/chat'}/>;
    }

    if (isPrivate === true)
    {
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
                       onChange={e => setRenderPasswordBox(true)}
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