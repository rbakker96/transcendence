import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import "./RenderCreateChannel.css";
import { User } from "../../../models/User.model";
import { Multiselect } from "multiselect-react-dropdown";
import { Redirect } from "react-router-dom";
import logo from "./img/42_logo.svg";
import API from "../../../API/API";

function RenderCreateChannel() {
  // states for data types
  const [channelName, setChannelName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [Password, setPassword] = useState("");
  // states for data transfer
  const [users, setUsers] = useState<Array<User>>([]);
  const [channelUsers, setChannelUsers] = useState<Array<User>>([]);
  const [invalid, setInvalid] = useState(false);
  const [activeUserID, setActiveUserID] = useState<User>();

  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    let mounted = true;
    const authorization = async () => {
      try {
        await axios.get("userData");
      } catch (err) {
        if (mounted) setUnauthorized(true);
      }
    };
    authorization();
    return () => {mounted = false;}
  }, []);

  useEffect(() => {
    let mounted = true;
    const getUser = async () => {
      try {
        const { data } = await axios.get("users");
        if (mounted) setUsers(data);
      } catch (err) {
        if (mounted) setUnauthorized(true);
      }
    };
    getUser();
    return () => {mounted = false;}
  }, []);

  useEffect(() => {
    let mounted = true;

    const setActiveID = async () => {
      try {
        const { data } = await API.User.getActiveUserID();
        if (mounted) setActiveUserID(data.activeUserID);
        users.forEach((user: User) => {
          if (user.id === data.activeUserID && mounted) setChannelUsers([user]);
        });
      } catch (err) {
        if (mounted) setUnauthorized(true);
      }
    };
    setActiveID();
    return () => {mounted = false;}
  }, [users]);

  let submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (!invalid) {
        await axios.post("channels", {
          Name: channelName,
          IsPrivate: isPrivate,
          IsDirect: false,
          Users: channelUsers,
          ownerId: activeUserID,
          Password: Password,
        });
        setRedirect(true);
      }
    } catch (err) {
      setUnauthorized(true);
    }
  };

  if (unauthorized) return <Redirect to={"/"} />;

  function renderChannelName() {
    return (
      <div className="form-floating">
        <input
          required
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          onChange={(e) => setChannelName(e.target.value)}
        />
        <label htmlFor="floatingInput">ChannelName</label>
      </div>
    );
  }

  function renderChooseUsers() {
    function OnSelectUser(selectedList: User[]) {
      setChannelUsers(selectedList);
      if (selectedList.length >= 3) setInvalid(false);
      else if (selectedList.length < 3) setInvalid(true);
    }
    return (
      <div>
        <Multiselect
          options={users}
          selectedValues={channelUsers}
          displayValue="username"
          placeholder="Choose Users"
          onSelect={OnSelectUser}
          onRemove={OnSelectUser}
        />
      </div>
    );
  }

  function renderIsPrivate() {
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="defaultCheck1"
          onClick={() => setIsPrivate(!isPrivate)}
        />
        <label className="form-check-label" htmlFor="defaultCheck1">
          Private
        </label>
      </div>
    );
  }

  function renderPassword() {
    if (isPrivate) {
      return (
        <div className="form-floating">
          <input
            required
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingInput">Password</label>
        </div>
      );
    } else return;
  }

  function renderChannelCreation() {
    return (
      <div>
        {renderChannelName()}
        {renderChooseUsers()}
        {renderIsPrivate()}
        {renderPassword()}
      </div>
    );
  }
  if (redirect && !invalid) return <Redirect to={"/chat"} />;
  else {
    return (
      <main className="Register_component">
        <form onSubmit={submit}>
            <img className="mb-4" src={logo} alt="42_logo" width="72" height="57" />
            {invalid ? (
            <p className="participantSubTitle">Choose 3 or more participants</p>
          ) : (
            <p />
          )}
          <h1 className="h3 mb-3 fw-normal">Create new Channel</h1>
          {renderChannelCreation()}
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Submit
          </button>
        </form>
      </main>
    );
  }
}

export default RenderCreateChannel;
