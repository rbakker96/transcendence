import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import API from "../../../API/API";
import { User } from "../../../models/User.model";
import RenderChangePassword from "../ChatContent/RenderChangePassword";
import { Redirect } from "react-router-dom";
import "./adminSettings.css";
import logo from "./img/42_logo.svg";
import axios from "axios";

function AdminSettings(props: any) {
  const [channelUsers, setChannelUser] = useState<User[]>([]);
  const [redirect, setRedirect] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [channelID, setChannelID] = useState(0);

  useEffect(() => {
    let mounted = true;

    const authorization = async () => {
      try { await axios.get('userData'); }
      catch(err){if(mounted) setUnauthorized(true);}
    }
    authorization();
    return () => {mounted = false;}
  }, []);

  useEffect(() => {
    let mounted = true;

    const setChannelid = () => {
      try { if (mounted) setChannelID(props.location.state.activeChannelId); }
      catch(err){if(mounted) setUnauthorized(true);}
    }
    setChannelid();
    return () => {mounted = false;}
  }, [props]);

  useEffect(() => {
    let mounted = true;
    const getChannelUsers = async () => {
      if (props) {
        try {
          const { data } = await API.Channels.getChannelUsers(
            props.location.state.activeChannelId
          );
          if (mounted) setChannelUser(data);
        } catch (err) { if (mounted) setUnauthorized(true); }
      }
    };
    getChannelUsers();
    return () => {mounted = false;}
  }, [props]);

  async function kickUser(userId: number) {
    try {
      await API.Channels.leaveChannel(userId, props.location.state.activeChannelId);
      alert("This user is now kicked from this channel");
      window.location.reload();
    } catch (err) {
      setUnauthorized(true);
    }
  }

  async function changeStatus(userId: number, newStatus: number) {
    try {
      await API.Channels.changeState(
        newStatus,
        props.location.state.activeChannelId,
        userId
      );
      if (newStatus === 3) alert("This user is now muted");
      else if (newStatus === 1) alert("This user is now an admin");
      else if (newStatus === 0)
        alert("All setting for this user have been reset");
      window.location.reload();
    } catch (err) {
      setUnauthorized(true);
    }
  }

  function renderKickButton(userId: number) {
    return (
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => kickUser(userId)}
      >
        Kick this user
      </button>
    );
  }

  function renderMuteButton(userId: number) {
    return (
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => changeStatus(userId, 3)}
      >
        Mute this user
      </button>
    );
  }

  function renderMakeAdminButton(userId: number) {
    return (
      <button
        type="button"
        className="btn btn-success"
        onClick={() => changeStatus(userId, 1)}
      >
        Make admin
      </button>
    );
  }

  function renderUndoAdmin(userId: number) {
    return (
      <button
        type="button"
        className="btn btn-dark"
        onClick={() => changeStatus(userId, 0)}
      >
        Undo all settings
      </button>
    );
  }

  if (unauthorized) return <Redirect to={"/"} />;
  if (redirect) return <Redirect to={"/chat"} />;

  return (
    <div className="adminPage">
      <img className="mb-4" src={logo} alt="./img/42_logo.svg" width="72" height="57"/>
      <h1 className="h3 mb-3 fw-normal register_title">Admin panel</h1>
      <table>
        <thead/>
        <tbody>
          {channelUsers.map((item: any) => (
            <tr key={item.user.id}>
              <td className="userNameCol">{item.user.username}</td>
              <td>{item.userType === 1 || item.userType === 2 || item.userType === 4 ? "" : renderKickButton(item.user.id)}</td>
              <td>{item.userType === 1 || item.userType === 2 || item.userType === 3 ? "" : renderMuteButton(item.user.id)}</td>
              <td>{item.userType === 1 || item.userType === 2 ? "" : renderMakeAdminButton(item.user.id)}</td>
              <td>{item.userType === 2 ? "" : renderUndoAdmin(item.user.id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Divider>
        <h1 className="h3 mb-3 fw-normal register_title">Password settings</h1>
        <RenderChangePassword activeChannelID={channelID}/>
      </Divider>
      <Divider>
        <button type="submit" className="btn btn-primary" onClick={() => setRedirect(true)}>Go back to Chat</button>
      </Divider>
    </div>
  );
}

export default AdminSettings;
