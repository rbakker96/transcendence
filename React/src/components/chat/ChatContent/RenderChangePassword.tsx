import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import API from "../../../API/API";


function RenderChangePassword(props : any){
    const [givenPassword, setGivenPassword] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [renderPasswordBox, setRenderPasswordBox] = useState(false);
    const [newPassword, setNewPassword] = useState('')
    useEffect(() => {
        const checkIsPrivate = async () => {
            const {data} = await API.Channels.show(props.activeChannelID)
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
            console.log("Password is ", password);
            props.setPasswordValid(true);
            setInvalid(false);
        }
        else
        {
            setInvalid(true);
            props.setPasswordValid(false);
        }
    }

    function renderNewPasswordBox() {
        if (renderPasswordBox === true) {
            return (
                <div className="form-floating">
                    <input required className="form-control" id="floatingInput" placeholder="name@example.com"
                           onChange={e => setNewPassword(e.target.value)}/>
                    <label htmlFor="floatingInput">New Password</label>
                </div>
            )
        }
        else
            return ;
    }

    if (isPrivate === true)
    {
        return (
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Old Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                       onChange={e => setGivenPassword(e.target.value)}/>
                <button type="submit" className="btn btn-primary" onClick={verifyPassword} >Submit</button>
                {   invalid?
                    <p className="registerSubTitle">Wrong password try another</p>
                    :
                    <p/>  }
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