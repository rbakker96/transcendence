import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../../../models/User.model";
import { Multiselect } from "multiselect-react-dropdown";
import { Redirect } from "react-router-dom";
import styles from "./CreateDirectMessage.module.css";
import API from "../../../API/API";

function CreateDirectMessage(props: any) {
  const [users, setUsers] = useState<Array<User>>([]);
  const [channelUsers, setChannelUsers] = useState<Array<User>>([]);
  // const [channelAdmin, setChannelAdmin] = useState<Array<User>>([]);
  const [redirect, setRedirect] = useState(false);
  const [valid, setValid] = useState(true);

  let admins: User[] = [];
  admins.push(props.activeUser);
  console.log(admins);

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
      Admins: admins,
      Password: "",
    });
    setRedirect(true);
  };

  function ChooseUsers() {
    function OnSelectUser(selectedList: any) {
      setChannelUsers(selectedList);
      if (selectedList.length > 2) {
        setValid(false);
      }
    }
    return (
      <div>
        <Multiselect
          options={users}
          displayValue="username"
          placeholder="Add one user"
          onSelect={OnSelectUser}
        />
      </div>
    );
  }

  function ChooseAdmin() {
    // function OnSelectAdmin(selectedList: any) {
    //   setChannelAdmin(selectedList);
    // }
    return (
      <div>
        <Multiselect
          selectedValues={admins}
          // options={users}
          displayValue="username"
          placeholder=""
          // onSelect={OnSelectAdmin}
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
            {!valid
              ? ( <p className={styles.registerSubTitle}>Can only add one user for direct message</p> )
              : ( <p /> )
            }
            <h1 className={styles.form_header}>
              Choose a user for direct messaging
            </h1>
            {ChooseAdmin()}
            {ChooseUsers()}
            <button className={styles.submit_button}>
              Submit
            </button>
          </form>
        </main>
      )}
    </div>
  );
}

export default CreateDirectMessage;
