import {Divider} from "antd";
import React, {useEffect, useState} from "react";
import API from "../../../API/API";
import {User} from "../../../models/User.model";
import RenderChangePassword from "../ChatContent/RenderChangePassword";

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

    function changeStatus(userId: number, newStatus: number)
    {
        API.Channels.changeState(newStatus, props.location.state.activeChannelId, userId);
    }

    function renderMuteButton(userId : number)
    {
        return(
            <button type="button" className="btn btn-warning" onClick={() => changeStatus(userId, 3)}>Mute this user</button>
        )
    }

    function renderMakeAdminButton(userId : number)
    {
        return (
            <button type="button" className="btn btn-success" onClick={() => changeStatus(userId, 2)}>Make admin</button>
        )
    }

    function renderUndoAdmin(userId : number)
    {
        return (
            <button type="button" className="btn btn-dark" onClick={() => changeStatus(userId, 0)}>Undo Admin</button>
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
            <Divider orientation={"left" }style={{ "color": "#5B8FF9"}}>
               Change Password
                <RenderChangePassword
                ActivaChannel={props.location.state.activeChannelId}/>
            </Divider>
        </div>
    )
}

export default AdminSettings;