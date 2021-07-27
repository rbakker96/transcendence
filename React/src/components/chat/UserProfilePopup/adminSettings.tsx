import {Divider} from "antd";
import React, {useEffect, useState} from "react";
import API from "../../../API/API";
import {User} from "../../../models/User.model";
import RenderChangePassword from "../ChatContent/RenderChangePassword";
import {Redirect} from "react-router-dom";
import "./adminSettings.css"
import logo from "./img/42_logo.svg";

function AdminSettings(props: any) {
    const [channelUsers, setChannelUser] = useState<User[]>([])
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
        const getChannelUsers = async () => {
            if (props.location.state.activeChannelId) {
                const {data} = await API.Channels.getChannelUsers(props.location.state.activeChannelId);
                setChannelUser(data);
            }
        }
        getChannelUsers()
    },[props.location.state.activeChannelId])

    function kickUser(userId : number) {
        API.Channels.leaveChannel(userId, props.location.state.activeChannelId)
    }

    function renderKickButton(userId : number) {
        return (
            <button type="button" className="btn btn-danger" onClick={() => kickUser(userId)}>Kick this user</button>
        )
    }

    function changeStatus(userId: number, newStatus: number) {
        API.Channels.changeState(newStatus, props.location.state.activeChannelId, userId);
    }

    function renderMuteButton(userId : number) {
        return(
            <button type="button" className="btn btn-warning" onClick={() => changeStatus(userId, 3)}>Mute this user</button>
        )
    }

    function renderMakeAdminButton(userId : number) {
        return (
            <button type="button" className="btn btn-success" onClick={() => changeStatus(userId, 2)}>Make admin</button>
        )
    }

    function renderUndoAdmin(userId : number) {
        return (
            <button type="button" className="btn btn-dark" onClick={() => changeStatus(userId, 0)}>Undo Admin</button>
        )
    }

    if (redirect === true) {
        return <Redirect to={'/chat'}/>;
    }
    return (
        <div className="adminPage">
            <img className="mb-4" src={logo} alt="./img/42_logo.svg" width="72" height="57"/>
            <h1 className="h3 mb-3 fw-normal register_title">Admin panel</h1>

            <table>
                <thead>
                </thead>
                <tbody>
                    {channelUsers.map((item: any) =>
                        <tr key={item.user.id}>
                            <td className="userNameCol">{item.user.username}</td>
                            <td>{renderKickButton(item.user.id)}</td>
                            <td>{renderMuteButton(item.user.id)}</td>
                            <td>{renderMakeAdminButton(item.user.id)}</td>
                            <td>{renderUndoAdmin(item.user.id)}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Divider >
                <h1 className="h3 mb-3 fw-normal register_title">Change Password</h1>
                <RenderChangePassword
                    activeChannelID={props.location.state.activeChannelId}/>
            </Divider>
            <Divider>
                <button type="submit" className="btn btn-primary" onClick={e => setRedirect(true)}>Go back to Chat</button>
            </Divider>

        </div>
    )
}

export default AdminSettings;