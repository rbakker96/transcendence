import { Comment } from "antd";
import React, { useEffect, useState } from "react";
import API from "../../../API/API";
import UserProfilePopup from "../UserProfilePopup/UserProfilePopup";
import "./ChatContent.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

type ChatMessageType = {
  channelID: number;
  senderID: number;
  messageContent: string;
  messageTimestamp: string;
};

type EachChatMessageProps = {
  message: ChatMessageType;
  oneShownPopup: string;
  setOneShownPopup: Function;
  activeUserID: number;
};

function EachChatMessage(props: EachChatMessageProps) {
  const content = props.message.messageContent;
  const datetime = props.message.messageTimestamp;
  const [IsOpenPopup, setIsOpenPopup] = useState(false);
  const [UserName, setUserName] = useState("");
  const [Avatar, setAvatar] = useState("");
  const [IsMuted, setIsMuted] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  const togglePopup = () => {
    setIsOpenPopup(!IsOpenPopup);
    props.setOneShownPopup(props.message.messageTimestamp);
  };

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
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await API.User.findName(props.message.senderID);
      setUserName(data.username);
      setAvatar(data.avatar);
    };
    getUser();
  }, [props, setUserName, setAvatar]);

  useEffect(() => {
    const getMuted = async () => {
      const { data } = await API.Channels.getState(
        props.message.senderID,
        props.message.channelID
      );
      console.log("data is", data);
      if (data === 3) setIsMuted(true);
    };
    getMuted();
  }, [props.message.senderID, props.message.channelID]);

  if (IsMuted) return <div />;
  if (unauthorized) return <Redirect to={"/"} />;
  else
    return (
      <div onClick={togglePopup}>
        <Comment
          content={content}
          author={UserName}
          avatar={Avatar}
          datetime={datetime}
        />
        {IsOpenPopup &&
          props.oneShownPopup === props.message.messageTimestamp && (
            <UserProfilePopup
              ActiveUserID={props.activeUserID}
              MessageUserID={props.message.senderID}
              UserName={UserName}
              Avatar={Avatar}
              ProfileLink={"http://placeholder"}
              handleClose={togglePopup}
              activeChannelId={props.message.channelID}
            />
          )}
      </div>
    );
}

export default EachChatMessage;
