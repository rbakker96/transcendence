import EachChatMessage from "./EachChatMessage";
import { useEffect, useRef, useState } from "react";
import API from "../../API/API";
import ChatInputBar from "./ChatInputBar";
import { message } from "antd";

type ChatChannelMessagesProps = {
  activeChannelID: number;
};

type ChatMessageType = {
  messageID: number;
  channelID: number;
  senderID: number;
  messageContent: string;
  messageTimestamp: string;
};

type newMessageType = {
  channelID: number;
  senderID: number;
  message: string;
  messageTimestamp: string;
};

const URL = "ws://localhost:8000";

function ChatChannelMessages(props: ChatChannelMessagesProps) {
  const [historicChatMessages, setHistoricChatMessages] = useState([]);
  const [messages, setMessages] = useState<newMessageType[]>([]);

  // need to figure out a way for the WebSocket type
  const ws: any = useRef(null);

  // Currently set to no dependencies, so the historic messages will only be got once
  useEffect(() => {
    const getChatMessages = async () => {
      const { data } = await API.ChatMessage.getAllChatMessages();
      setHistoricChatMessages(data);
    };
    getChatMessages();
  }, []);

  useEffect(() => {
    ws.current = new WebSocket(URL);
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => {
      console.log("ws closed");
      // automatically try to reconnect on connection loss
      ws.current = new WebSocket(URL);
    };
    ws.current.onmessage = (message: any) => {
      const message_json = JSON.parse(message.data);
      console.log("new message is " + message_json);
      setMessages((prevState) => [...prevState, message.data]);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  return (
    <div>
      {historicChatMessages
        .filter(
          (message: ChatMessageType) =>
            message.channelID === props.activeChannelID
        )
        .map((message: ChatMessageType) => (
          <EachChatMessage key={message.messageID} message={message} />
        ))}
      <ChatInputBar activeChannelID={props.activeChannelID} />
      <p>hello {messages.join(" ")}</p>
    </div>
  );
}

export default ChatChannelMessages;
