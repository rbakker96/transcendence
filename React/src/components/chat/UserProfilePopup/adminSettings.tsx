import {Divider} from "antd";
import React, {useEffect, useState} from "react";
import API from "../../../API/API";
import {User} from "../../../models/User.model";

function AdminSettings(props: any) {
    console.log("kom ik in admin ?")
    console.log(props.location.state.activeChannelId, "wat is die domme id dan");
    const [channelUsers, setChannelUser] = useState<User[]>([])

    useEffect(() => {
        const getChannelUsers = async () => {
            console.log("active channel is ", props.location.state.activeChannelId);
            if (props.location.state.activeChannelId) {
                const {data} = await API.Channels.index(props.location.state.activeChannelId);
                setChannelUser(data.users);
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

    function renderMuteButton(userId : number)
    {
        return(
            <button type="button" className="btn btn-warning">Warning</button>
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
            {channelUsers.map((item: User) => (
                <ul key={item.id} >
                    {item.username}
                    {renderKickButton(item.id)}
                    {renderMuteButton(item.id)}
                    {renderMakeAdminButton(item.id)}
                    {renderUndoAdmin(item.id)}
                </ul>
            ))}
        </div>
    )
}

export default AdminSettings;