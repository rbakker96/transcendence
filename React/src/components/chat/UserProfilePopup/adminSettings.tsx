import {Divider} from "antd";
import React, {useEffect, useState} from "react";
import API from "../../../API/API";
import {User} from "../../../models/User.model";

function AdminSettings(props: any) {
    console.log(props.location.state.activeChannelId, "wat is die domme id dan");
    const [channelUsers, setChannelUser] = useState<User[]>([])

    useEffect(() => {
        const getChannelUsers = async () => {
            console.log("active channel is ", props.location.state.activeChannelId);
            if (props.location.state.activeChannelId) {
                const {data} = await API.Channels.getChannelUsers(props.location.state.activeChannelId);
                console.log("data is ", data);
                setChannelUser(data);
            }
        }
        getChannelUsers()
    },[props.location.state.activeChannelId])

    function kickUser(userId : number)
    {
        API.Channels.leaveChannel(userId, props.location.state.activeChannelId)
    }

    function renderKickButton(userId : number)
    {
        return (
            <button type="button" className="btn btn-danger" onClick={() => kickUser(userId)}>Kick this user</button>
        )
    }

    function muteUser(userId: number)
    {
        console.log("active channelId", props.location.state.activeChannelId)
        console.log("User Id", userId)
        API.Channels.changeState(3, props.location.state.activeChannelId, userId);
        console.log("deze beste man is gemute");
    }

    function renderMuteButton(userId : number)
    {
        return(
            <button type="button" className="btn btn-warning" onClick={() => muteUser(userId)}>Mute this user</button>
        )
    }

    function renderMakeAdminButton(userId : number)
    {
        return (
            <button type="button" className="btn btn-success">Make admin</button>
        )
    }

    function renderUndoAdmin(userId : number)
    {
        return (
            <button type="button" className="btn btn-dark">Undo Admin</button>
        )
    }

    return (
        <div>
            <Divider orientation={"left"} style={{ "color": "#5B8FF9" }}>
                Users in chat
            </Divider>
            {channelUsers.map((item: any) => (
                <ul key={item.user.id} >
                    {item.user.username}
                    {renderKickButton(item.user.id)}
                    {renderMuteButton(item.user.id)}
                    {renderMakeAdminButton(item.user.id)}
                    {renderUndoAdmin(item.user.id)}
                </ul>
            ))}
        </div>
    )
}

export default AdminSettings;