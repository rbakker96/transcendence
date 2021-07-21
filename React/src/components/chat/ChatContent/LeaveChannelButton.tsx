import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../../API/API";

type LeaveChannelProps = {
  activeChannelID: number;
};

function LeaveChannelButton(props: LeaveChannelProps) {
  const [userID, setUserID] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("userData");
      setUserID(data.id);
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
