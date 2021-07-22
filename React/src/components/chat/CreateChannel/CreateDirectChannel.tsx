import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../../../models/User.model";
import { Multiselect } from "multiselect-react-dropdown";
import { Redirect } from "react-router-dom";
import styles from "./CreateDirectMessage.module.css";
import API from "../../../API/API";
import logo from "./img/42_logo.svg";

function CreateDirectMessage() {
  const [Users, setUsers] = useState<Array<User>>([]);
  const [channelUsers, setChannelUsers] = useState<Array<User>>([]);
  const [channelAdmin, setChannelAdmin] = useState<Array<User>>([]);
  const [redirect, setRedirect] = useState(false);
  const [valid, setValid] = useState(false);
  const [duplicateChannel, setDuplicateChannel] = useState(false);

  let warning_message = "Please add one user for direct message";

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("users");
      setUsers(data);
    };
    getUser();
  }, []);

  useEffect(() => {
    const getActiveUserID = async () => {
      const { data } = await API.User.getActiveUserID();
      Users.forEach((user: User) => {
        if (user.id === data.activeUserID) setChannelAdmin([user]);
      });
    };
    getActiveUserID();
  }, [Users]);

  let submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (valid) {
        await axios.post("channels", {
          Name: "DirectMessage",
          IsPrivate: false,
          IsDirect: true,
          Users: channelUsers,
          Admins: channelAdmin,
          Password: "",
        });
      }
      setRedirect(true);
    } catch (e) {
      setRedirect(false);
      setValid(false);
      setDuplicateChannel(true);
    }
  };

  if (duplicateChannel) {
    warning_message = "The same direct message channel has been created";
  }

  function OnUserChange(selectedList: User[]) {
    setChannelUsers(selectedList);
    if (selectedList.length === 2) setValid(true);
    else if (selectedList.length === 1 || selectedList.length > 2)
      setValid(false);
  }

  function OnAdminChange(selectedList: User[]) {
    setChannelAdmin(selectedList);
    if (selectedList.length > 2) setValid(false);
  }

  return (
    <div>
      {redirect ? (
        <Redirect to={"/chat"} />
      ) : (
        <main className={styles.Register_component}>
          <img className="mb-4" src={logo} alt="42_logo" width="72" height="57"/>
          <form onSubmit={submit}>
            {!valid && (
              <p className={styles.registerSubTitle}> {warning_message} </p>
            )}
            <h1 className={styles.form_header}>
              Choose a user for direct messaging
            </h1>
            {channelAdmin && (
              <>
                <Multiselect
                  selectedValues={channelAdmin}
                  options={Users}
                  displayValue="username"
                  placeholder=""
                  onSelect={OnAdminChange}
                  onRemove={OnAdminChange}
                />
                <Multiselect
                  options={Users}
                  selectedValues={channelAdmin}
                  displayValue="username"
                  placeholder="Add one user"
                  onSelect={OnUserChange}
                  onRemove={OnUserChange}
                />
              </>
            )}
            <button className={styles.submit_button}>Submit</button>
          </form>
        </main>
      )}
    </div>
  );
}

export default CreateDirectMessage;
