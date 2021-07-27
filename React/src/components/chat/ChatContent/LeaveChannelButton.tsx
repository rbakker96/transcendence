import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../../API/API";
import {Redirect} from "react-router-dom";

type LeaveChannelProps = {
  activeChannelID: number;
};

function LeaveChannelButton(props: LeaveChannelProps) {
  const [userID, setUserID] = useState(0);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get("userData");
        setUserID(data.id);
      } catch (err) {setUnauthorized(true);}

    };
    getUser();
  }, []);

  function leaveChannel() {
    const deleteUser = async () => {
      await API.Channels.leaveChannel(userID, props.activeChannelID);
      window.location.reload();
    };
    deleteUser();
  }

  if (unauthorized)
    return <Redirect to={'/'}/>;

  return (
    <div>
      {props.activeChannelID ? (
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={leaveChannel}
        >
          Leave Channel
        </button>
      ) : null}
    </div>
  );
}

export default LeaveChannelButton;
