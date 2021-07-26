import React, {useState} from "react";
import API from "../../../API/API";

type ChatContentProps = {
    activeChannelID: number;
    setPasswordValid: Function;
    passwordValid: boolean;
};

function RenderGivePassword(props : ChatContentProps) {
    const [givenPassword, setGivenPassword] = useState('');
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
