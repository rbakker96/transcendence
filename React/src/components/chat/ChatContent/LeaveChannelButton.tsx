import React from "react";
import API from "../../../API/API";

type LeaveChannelProps = {
  activeChannelID: number;
  activeUserID: number;
};

function LeaveChannelButton(props: LeaveChannelProps) {
  function leaveChannel() {
    const deleteUser = async () => {
      await API.Channels.leaveChannel(
        props.activeUserID,
        props.activeChannelID
      );
      window.location.reload();
    };
    deleteUser();
  }

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
