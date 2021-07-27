import EachChatMessage from "./EachChatMessage";
import React, { useEffect, useRef, useState } from "react";
import API from "../../../API/API";
import ChatInputBar from "./ChatInputBar";
import axios from "axios";
import {Redirect} from "react-router-dom";

type ChatChannelMessagesProps = {
  activeChannelID: number;
  activeUserID: number;
};

type DatabaseMessageType = {
  messageID: number;
  channelID: number;
  senderID: number;
  messageContent: string;
  messageTimestamp: string;
};

type SocketMessageType = {
  channelID: number;
  senderID: number;
  messageContent: string;
  messageTimestamp: string;
};

function ChatChannelMessages(props: ChatChannelMessagesProps) {
  const [historicChatMessages, setHistoricChatMessages] = useState([]);
  const [newMessages, setNewMessages] = useState<SocketMessageType[]>([]);
  const [oneShownPopup, setOneShownPopup] = useState("");
  const [unauthorized, setUnauthorized] = useState(false);

  const websocket: any = useRef<WebSocket>(null);
  const URL = `ws://localhost:8000/chat/${props.activeChannelID}`;

  useEffect(() => {
    let mounted = true;

    const authorization = async () => {
      try { await axios.get('userData'); }
      catch(err){
        if(mounted)
          setUnauthorized(true);
      }
    }
    authorization();
    return () => {mounted = false;}
  }, []);

  useEffect(() => {
    const getChatMessages = async () => {
      const { data } = await API.ChatMessage.getChannelMessages(props.activeChannelID);
      setHistoricChatMessages(data);
    };
    getChatMessages();
  }, [props.activeChannelID]);

  useEffect(() => {
    websocket.current = new WebSocket(URL);

    websocket.current.onopen = () => {
      // console.log(`ws opened & active channel: ${props.activeChannelID}`);
    };

    websocket.current.onclose = () => {
      // console.log(`ws closed & active channel: ${props.activeChannelID}`);
      setNewMessages([]);
    };

    websocket.current.addEventListener("message", function (event: any) {
      const object = JSON.parse(event.data);
      if (object.event === "newMessage") {
        const new_message: SocketMessageType = {
          channelID: object.data.channelID,
          senderID: object.data.senderID,
          messageContent: object.data.messageContent,
          messageTimestamp: object.data.messageTimestamp,
        };
        if (object.data.channelID === props.activeChannelID)
          setNewMessages((prevState: SocketMessageType[]) => [...prevState, new_message]);
      }
    });
    return () => {
      websocket.current.close();
    };
  }, [props.activeChannelID, URL]);

  if (unauthorized)
    return <Redirect to={'/'}/>;

  return (
    <div>
      {historicChatMessages.map((message: DatabaseMessageType) => (
        <EachChatMessage
          key={message.messageID}
          message={message}
          oneShownPopup={oneShownPopup}
          setOneShownPopup={setOneShownPopup}
          activeUserID={props.activeUserID}
        />
      ))}
      {newMessages.map((message: SocketMessageType) => (
        <EachChatMessage
          key={message.messageTimestamp}
          message={message}
          oneShownPopup={oneShownPopup}
          setOneShownPopup={setOneShownPopup}
          activeUserID={props.activeUserID}
        />
      ))}
      <ChatInputBar
        websocket={websocket.current}
        activeChannelID={props.activeChannelID}
        activeUserID={props.activeUserID}
      />
    </div>
  );
}

export default ChatChannelMessages;
