import { useEffect, useState } from "react";
import API from "../../../API/API";
import RenderGivePassword from "./RenderGivePassword";
import ChatChannelHeader from "./ChatChannelHeader";
import ChatChannelMessages from "./ChatChannelMessages";
import "./ChatContent.css"

type ChatContentProps = {
  activeChannelID: number;
  setActiveChannelID: Function;
  IDIsMuted: number[];
  setIDIsMuted: Function;
  activeUserID: number;
};

function ChatContent(props: ChatContentProps) {
  const active_channel_ID: number = props.activeChannelID;
  const [isPrivate, setIsPrivate] = useState(false);
  const [PasswordValid, setPasswordValid] = useState(false);

  useEffect(() => {
    const getChannelType = async () => {
      const { data } = await API.Channels.findName(active_channel_ID);
      setIsPrivate(data.IsPrivate);
    };
    getChannelType();
  });

  return (
    <div className="chatmessages">
      {isPrivate && !PasswordValid
        ? ( <RenderGivePassword
          activeChannelID={active_channel_ID}
          setPasswordValid={setPasswordValid}
          passwordValid={PasswordValid} />)
        : (
          <>
          <ChatChannelHeader
              activeChannelID={props.activeChannelID}
              activeUserID={props.activeUserID}
              setActiveChannelID={props.setActiveChannelID}/>
          {props.activeChannelID
            ? ( <ChatChannelMessages
              activeChannelID={props.activeChannelID}
              activeUserID={props.activeUserID}
              IDIsMuted={props.IDIsMuted}
              setIDIsMuted={props.setIDIsMuted} />)
            : (<div />)}
          </>)
      }
    </div>
  );
}

export default ChatContent;
