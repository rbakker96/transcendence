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
      } catch (err) { if (mounted) setUnauthorized(true); }
    };
    authorization();
    return () => {mounted = false;}
  }, []);

  useEffect(() => {
    let mounted = true;
    const getUser = async () => {
      try {
        const { data } = await API.User.findName(props.message.senderID);
        if (mounted) {
          setUserName(data.username);
          setAvatar(data.avatar);
        }
      } catch (err) { if (mounted) setUnauthorized(true); }
    };
    getUser();
    return () => {mounted = false;}
  }, [props.message.senderID]);

  useEffect(() => {
    let mounted = true;
    const getMuted = async () => {
      try {
        const { data } = await API.Channels.getState(
          props.message.senderID,
          props.message.channelID
        );
        if (data === 3 && mounted) setIsMuted(true);
      } catch (err) { if (mounted) setUnauthorized(true); }
    };
    getMuted();
    return () => {mounted = false;}
  }, [props.message.senderID, props.message.channelID]);

  if (unauthorized) return <Redirect to={"/"} />;

  if (IsMuted) return <div />;
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
              handleClose={togglePopup}
              activeChannelId={props.message.channelID}
            />
          )}
      </div>
    );
}

export default EachChatMessage;
