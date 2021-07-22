import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import "./RenderCreateChannel.css";
import { User } from "../../../models/User.model";
import { Multiselect } from "multiselect-react-dropdown";
import { Redirect } from "react-router-dom";
import logo from "./img/42_logo.svg";
import API from "../../../API/API";

function RenderCreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [Password, setPassword] = useState("");
  const [users, setUsers] = useState<Array<User>>([]);
  const [channelUsers, setChannelUsers] = useState<Array<User>>([]);
  const [channelAdmins, setChannelAdmins] = useState<Array<User>>([]);
  const [valid, setValid] = useState(false);
  const [ActiveUserID, setActiveUserID] = useState<number>(0);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("users");
      setUsers(data);
    };
    getUser();
  }, []);

  useEffect(() => {
    const setActiveID = async () => {
      const { data } = await API.User.getActiveUserID();
      setActiveUserID(data.activeUserID);
    };

    const getUser = async () => {
      const { data } = await API.User.findName(ActiveUserID);
      if (data) {
        setChannelAdmins([data]);
        setChannelUsers([data]);
      }
    };
    setActiveID();
    getUser();
  }, [ActiveUserID]);

  let submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (valid) {
      await axios.post("channels", {
        Name: channelName,
        IsPrivate: isPrivate,
        IsDirect: false,
        Users: channelUsers,
        Admins: channelAdmins,
        Password: Password,
      });
      setRedirect(true);
    }
  };

  function renderChannelName() {
    return (
      <div className="form-floating">
        <input
          required
          className="form-control"
          id="floatingInput"
          onChange={(e) => setChannelName(e.target.value)}
        />
        <label htmlFor="floatingInput">ChannelName</label>
      </div>
    );
  }

  function renderChooseUsers() {
    function OnUserChange(selectedList: User[]) {
      setChannelUsers(selectedList);
      if (selectedList.length < 3) setValid(false);
      else setValid(true);
    }

    return (
      <div>
        <Multiselect
          options={users}
          selectedValues={channelAdmins}
          displayValue="username"
          placeholder="Choose Users"
          onSelect={OnUserChange}
          onRemove={OnUserChange}
        />
      </div>
    );
  }

  function renderChooseAdmin() {
    function OnAdminChange(selectedList: User[]) {
      setChannelAdmins(selectedList);
      if (selectedList.length < 1) setValid(false);
    }

    return (
      <div>
        <Multiselect
          options={users}
          selectedValues={channelAdmins}
          displayValue="username"
          placeholder="Choose Additional Admins"
          onSelect={OnAdminChange}
          onRemove={OnAdminChange}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingInput">Password</label>
        </div>
      );
    } else return;
  }

  return (
    <div>
      {redirect ? (
        <Redirect to={"/chat"} />
      ) : (
        <main className="Register_component">
          <img className="mb-4" src={logo} alt="42_logo" width="72" height="57"/>
          <form onSubmit={submit}>
            {!valid && (
              <p className="participantSubTitle">
                Choose more than 2 other participants
              </p>
            )}
            <h1 className="h3 mb-3 fw-normal">Create new Channel</h1>
            {renderChannelName()}
            {renderChooseAdmin()}
            {renderChooseUsers()}
            {renderIsPrivate()}
            {renderPassword()}
            <button className="w-100 btn btn-lg btn-primary">Submit</button>
          </form>
        </main>
      )}
    </div>
  );
}

export default RenderCreateChannel;
