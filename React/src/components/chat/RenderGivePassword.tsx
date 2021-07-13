import React, {useEffect, useState} from "react";
import API from "../../API/API";

type ChatContentProps = {
    activeChannelID: number;
    setPasswordValid: Function;
};

function RenderGivePassword(props : ChatContentProps) {
    const [givenPassword, setGivenPassword] = useState('');
    const [dbPassword, setDbPassword] = useState('');
    // retrieve password from database
    useEffect( () => {
        const getChannelType = async () => {
            const {data}  = await API.Channels.findName(props.activeChannelID)
            setDbPassword(data.password);
        }
        getChannelType();
    })

    function verifyPassword()
    {
        if (givenPassword === dbPassword)
        {
            // ik ga hier een bool zetten zodat de ding weet dat ww is ingevuld
            props.setPasswordValid(true);
            // ik forward hem terug naar chatcontent
        }
        else
        {
            // forward naar een error page oid
        }



    }

    return (
        <form onSubmit={verifyPassword}>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
            onChange={e => setGivenPassword(e.target.value)}/>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </div>
        </form>
        )
};

export default RenderGivePassword;