import React, { useEffect, useState } from "react";
import API from "../../../API/API";
import RenderGivePassword from "./RenderGivePassword";
import ChatChannelHeader from "./ChatChannelHeader";
import ChatChannelMessages from "./ChatChannelMessages";
import "./ChatContent.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

type ChatContentProps = {
  activeChannelID: number;
  setActiveChannelID: Function;
  activeUserID: number;
};

function ChatContent(props: ChatContentProps) {
  const active_channel_ID: number = props.activeChannelID;
  const [isPrivate, setIsPrivate] = useState(false);
  const [isDirect, setIsDirect] = useState(false);
  const [PasswordValid, setPasswordValid] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

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
    const getChannelType = async () => {
      try {
        const { data } = await API.Channels.findName(props.activeChannelID);
        if (mounted) {
          setIsPrivate(data.IsPrivate);
          setIsDirect(data.IsDirect);
        }
      } catch (err) { if (mounted) setUnauthorized(true); }
    };
    getChannelType();
    return () => {mounted = false;}
  }, [props.activeChannelID]);

  if (unauthorized) return <Redirect to={"/"} />;

  return (
    <div className="chatmessages">
      {isPrivate && !PasswordValid ? (
        <RenderGivePassword
          activeChannelID={active_channel_ID}
          setPasswordValid={setPasswordValid}
          passwordValid={PasswordValid}
        />
      ) : (
        <>
          <ChatChannelHeader
            activeChannelID={props.activeChannelID}
            activeUserID={props.activeUserID}
            setActiveChannelID={props.setActiveChannelID}
            isDirect={isDirect}
          />
          {props.activeChannelID ? (
            <ChatChannelMessages
              activeChannelID={props.activeChannelID}
              activeUserID={props.activeUserID}
            />
          ) : null}
        </>
      )}
    </div>
  );
}

export default ChatContent;
