import React, {useEffect, useState} from "react";
import API from "../../../API/API";
import axios from "axios";
import {Redirect} from "react-router-dom";

type ChatContentProps = {
    activeChannelID: number;
    setPasswordValid: Function;
    passwordValid: boolean;
};

function RenderGivePassword(props : ChatContentProps) {
    const [unauthorized, setUnauthorized] = useState(false);
    const [givenPassword, setGivenPassword] = useState('');
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

     async function retrievePassword() {
         try {
             const {data} = await API.Channels.login(givenPassword, props.activeChannelID)
             return data;
         }catch (err) {setUnauthorized(true);}
    }

    async function verifyPassword() {
         try {
             const password = await retrievePassword()
             if (password === true) {
                 props.setPasswordValid(true);
                 setInvalid(false);
             }
             else
             {
                 setInvalid(true);
                 props.setPasswordValid(false);
             }
         }catch (err) {setUnauthorized(true);}
    }

    if (unauthorized)
        return <Redirect to={'/'}/>;

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
}

export default RenderGivePassword;
