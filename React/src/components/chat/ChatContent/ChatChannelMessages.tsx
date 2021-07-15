import EachChatMessage from "./EachChatMessage";
import { useEffect, useRef, useState } from "react";
import API from "../../../API/API";
import ChatInputBar from "./ChatInputBar";

type ChatChannelMessagesProps = {
  activeChannelID: number;
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

  const websocket: any = useRef<WebSocket>(null);
  const URL = `ws://localhost:8000/chat/${props.activeChannelID}`;

  useEffect(() => {
    const getChatMessages = async () => {
      const { data } = await API.ChatMessage.getChannelMessages(
        props.activeChannelID
      );
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
        console.log("React: newMessage event triggered");
        const new_message = {
          channelID: object.data.channelID,
          senderID: object.data.senderID,
          messageContent: object.data.messageContent,
          messageTimestamp: object.data.messageTimestamp,
        };
        if (object.data.channelID === props.activeChannelID)
          setNewMessages((prevState) => [...prevState, new_message]);
      }
    });

    return () => {
      websocket.current.close();
    };
  }, [props.activeChannelID, URL]);

  return (
    <div>
      {historicChatMessages.map((message: DatabaseMessageType) => (
        <EachChatMessage key={message.messageID} message={message} />
      ))}
      {newMessages.map((message: SocketMessageType) => (
        <EachChatMessage key={message.messageTimestamp} message={message} />
      ))}

      <ChatInputBar
        websocket={websocket.current}
        activeChannelID={props.activeChannelID}
      />
    </div>
  );
}

export default ChatChannelMessages;
