import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../../../models/User.model";
import { Multiselect } from "multiselect-react-dropdown";
import { Redirect } from "react-router-dom";
import styles from "./CreateDirectMessage.module.css";
import API from "../../../API/API";
import logo from "./img/42_logo.svg";

function CreateDirectMessage() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [channelUsers, setChannelUsers] = useState<Array<User>>([]);
  const [channelAdmin, setChannelAdmin] = useState<Array<User>>([]);
  const [redirect, setRedirect] = useState(false);
  const [valid, setValid] = useState(false);

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
      users.forEach((user: User) => {
        if (user.id === data.activeUserID) setChannelAdmin([user]);
      });
    };
    getActiveUserID();
  }, [users]);

  let submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (valid) {
      await axios.post("channels", {
        Name: "DirectMessage",
        IsPrivate: false,
        Users: channelUsers,
        Admins: channelAdmin,
        Password: "",
      });
      setRedirect(true);
    }
  };

  function OnSelectUser(selectedList: User[]) {
    setChannelUsers(selectedList);
    if (selectedList.length === 2) setValid(true);
    else if (selectedList.length === 1 || selectedList.length > 2)
      setValid(false);
  }

  function OnRemove(selectedList: User[]) {
    if (selectedList.length === 2) setValid(true);
    else if (selectedList.length === 1 || selectedList.length > 2)
      setValid(false);
  }

  return (
    <div>
      {redirect ? ( <Redirect to={"/chat"} /> )
        : (
        <main className={styles.Register_component}>
          <img className="mb-4" src={logo} alt="42_logo" width="72" height="57"/>
          <form onSubmit={submit}>
            {!valid &&
              <p className={styles.registerSubTitle}>
                Please add one user for direct message
              </p>
            }
            <h1 className={styles.form_header}>
              Choose a user for direct messaging
            </h1>
            {channelAdmin && (
              <>
                <Multiselect
                  selectedValues={channelAdmin}
                  displayValue="username"
                  placeholder=""
                />
                <Multiselect
                  options={users}
                  selectedValues={channelAdmin}
                  displayValue="username"
                  placeholder="Add one user"
                  onSelect={OnSelectUser}
                  onRemove={OnRemove}
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
