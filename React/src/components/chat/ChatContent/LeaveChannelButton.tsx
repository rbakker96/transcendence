import React, { useState } from "react";
import API from "../../../API/API";
import {Redirect} from "react-router-dom";

type LeaveChannelProps = {
  activeChannelID: number;
  activeUserID: number;
};

function LeaveChannelButton(props: LeaveChannelProps) {
  const [unauthorized, setUnauthorized] = useState(false);

  function leaveChannel() {
    const deleteUser = async () => {
      try {
        await API.Channels.leaveChannel(
            props.activeUserID,
            props.activeChannelID);
        window.location.reload();
      }catch (err) {setUnauthorized(true);}
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
          className="btn btn-danger leaveChannel"
          onClick={leaveChannel}
        >
          Leave Channel
        </button>
      ) : null}
    </div>
  );
}

export default LeaveChannelButton;
