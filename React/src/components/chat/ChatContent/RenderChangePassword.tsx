import React, { SyntheticEvent, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import API from "../../../API/API";
import axios from "axios";
import './ChatContent.css'

type RenderChangePasswordProps = {
  activeChannelID: number;
};

function RenderChangePassword(props: RenderChangePasswordProps) {
  const [givenPassword, setGivenPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [renderPasswordBox, setRenderPasswordBox] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    let mounted = true;
    const authorization = async () => {
      try {
        await axios.get("userData");
      } catch (err) { if (mounted) setUnauthorized(true); }
    };
    authorization();
    return () => {mounted = false;}
  }, []);

  useEffect(() => {
    let mounted = true;
    const checkIsPrivate = async () => {
      try {
        const { data } = await API.Channels.getOne(props.activeChannelID);
        if (mounted) setIsPrivate(data.IsPrivate);
      } catch (err) { if (mounted) setUnauthorized(true); }
    };
    checkIsPrivate();
    return () => {mounted = false;}
  }, [props.activeChannelID]);

  async function retrievePassword() {
    try {
      const { data } = await API.Channels.login(
        givenPassword,
        props.activeChannelID
      );
      return data;
    } catch (err) { setUnauthorized(true); }
  }

  async function verifyPassword() {
    try {
      const password = await retrievePassword();
      if (password === true) {
        setRenderPasswordBox(true);
        setInvalid(false);
      } else {
        setInvalid(true);
      }
    } catch (err) { setUnauthorized(true); }
  }

  async function removePassword() {
    try {
      await axios.put('channels/removePassword', {channelId : props.activeChannelID});
      window.location.reload();
    } catch (err) {setUnauthorized(true);}
  }

  let submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await API.Channels.changePassword(newPassword, props.activeChannelID);
      setRedirect(true);
    } catch (err) {
      setUnauthorized(true);
    }
  };

  function renderNewPasswordBox() {
    if (renderPasswordBox) {
      return (
          <form onSubmit={submit}>
            <div className="form-floating newPassword">
              <input required type="password" className="form-control" id="floatingInput"
                onChange={(e) => setNewPassword(e.target.value)}/>
              <label htmlFor="floatingInput">New password</label>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
      );
    } else return;
  }

  if (unauthorized) return <Redirect to={"/"} />;

  if (redirect) {
    return <Redirect to={"/chat"} />;
  }

  if (isPrivate) {
    return (
      <div className="form-floating">
        <input required type="password" className="form-control" id="floatingInput"
          onChange={(e) => setGivenPassword(e.target.value)}/>
        <label htmlFor="floatingInput">Enter current password</label>
        {invalid ? (
          <p className="registerSubTitle">Wrong password try another</p>
        ) : (
          <p />
        )}
        <div className="passwordButtons">
          <button type="submit" className="btn btn-primary" onClick={verifyPassword}>Change password</button>
          <button type="submit" className="btn btn-danger removeButton" onClick={removePassword}>Remove Password</button>
        </div>
          {renderNewPasswordBox()}
      </div>
    );
  } else {
    return (
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"
          onChange={() => setRenderPasswordBox(true)}/>
        <label className="form-check-label" htmlFor="defaultCheck1">Add password to channel</label>
        {renderNewPasswordBox()}
      </div>
    );
  }
}

export default RenderChangePassword;
