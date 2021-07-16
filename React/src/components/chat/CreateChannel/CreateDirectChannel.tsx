import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import "./RenderCreateChannel.css";
import { User } from "../../../models/User.model";
import { Multiselect } from "multiselect-react-dropdown";
import { Redirect } from "react-router-dom";
import styles from "./CreateDirectMessage.module.css";

function CreateDirectMessage() {
  const [redirect, setRedirect] = useState(false);
  const [users, setUsers] = useState<Array<User>>([]);
  const [channelUsers, setChannelUsers] = useState<Array<User>>([]);
  const [channelAdmins, setChannelAdmins] = useState<Array<User>>([]);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("users");
      setUsers(data);
    };
    getUser();
  }, []);

  let submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("channels", {
      Name: "DirectMessage",
      IsPrivate: false,
      Users: channelUsers,
      Admins: channelAdmins,
      Password: "",
    });
    setRedirect(true);
  };

  function ChooseUsers() {
    function OnSelectUser(selectedList: any) {
      setChannelUsers(selectedList);
      if (selectedList.length < 2) {
        setInvalid(true);
      } else {
        setInvalid(false);
      }
    }
    return (
      <div>
        <Multiselect
          options={users}
          displayValue="username" // Property name to display in the dropdown options
          placeholder="Choose Users"
          onSelect={OnSelectUser}
        />
      </div>
    );
  }

  function ChooseAdmin() {
    function OnSelectAdmin(selectedList: any) {
      setChannelAdmins(selectedList);
    }
    return (
      <div>
        <Multiselect
          options={users}
          displayValue="username"
          placeholder="Choose Admins"
          onSelect={OnSelectAdmin}
        />
      </div>
    );
  }

  return (
    <div>
      {redirect
        ? (<Redirect to={"/chat"} />)
        : (
        <main className={styles.Register_component}>
          <form onSubmit={submit}>
            {invalid
              ? ( <p className={styles.registerSubTitle}>Choose more than 1 participant</p> )
              : ( <p /> )
            }
            <h1 className={styles.form_header}>
              Choose a user for direct messaging
            </h1>
            {ChooseAdmin()}
            {ChooseUsers()}
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Submit
            </button>
          </form>
        </main>
      )}
    </div>
  );
}

export default CreateDirectMessage;
