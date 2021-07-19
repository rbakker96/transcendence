import React, {useEffect, useState} from "react";
import API from "../../../API/API";
import {Redirect} from "react-router-dom";

type ChatContentProps = {
    activeChannelID: number;
    setPasswordValid: Function;
    passwordValid: boolean;
};

function RenderGivePassword(props : ChatContentProps) {
    const [givenPassword, setGivenPassword] = useState('');
    const [dbPassword, setDbPassword] = useState(0);
    const [invalid, setInvalid] = useState(false);


     async function retrievePassword()
     {
        const {data} = await API.Channels.login(givenPassword, props.activeChannelID)
        return data;
    }


    async function verifyPassword()
    {
        const password = await retrievePassword()
        if (password === true) {
            props.setPasswordValid(true);
            setInvalid(false);
            return (
                <Redirect to={{
                    pathname: "/renderChatContent",
                    state: {activeChannelId: props.activeChannelID}
                }}
                />
            )
        }
        else
        {
            setInvalid(true);
            props.setPasswordValid(false);
        }
    }

    return (
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
            onChange={e => setGivenPassword(e.target.value)}/>
            <button type="submit" className="btn btn-primary" onClick={verifyPassword} >Submit</button>
            {   invalid?
                <p className="registerSubTitle">Wrong password try another</p>
                :
                <p/>  }
        </div>
        )
};

export default RenderGivePassword;
