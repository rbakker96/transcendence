import EachChatMessage from "./EachChatMessage";
import {useEffect, useState} from "react";
import axios from "axios";

type ChatChannelMessagesProps = {
  activeChannelId: number;
  allChatMessages: {
    messageId: number;
    userId: number;
    userName: string;
    userAvatar: string;
    messageTimeStamp: string;
    messageContent: string;
    channelId: number;
    channelName: string;
  }[];
};

type ChatMessageType = {
  messageID: number;
  channelID: number;
  senderID: number;
  messageContent: string;
  messageTimestamp: string;
}

function ChatChannelMessages(props: ChatChannelMessagesProps) {
  console.log("Entered ChatChannelMessages");

  const [allChatMessages, setAllChatMessages] = useState([]);

  useEffect(() => {
    (async () => {
      const {data} = await axios.get(
        "http://localhost:8000/api/chatMessage"
      );
      console.log(data);
      setAllChatMessages(data);
    })();
  }, []);

  return (
    <div>
      {allChatMessages
        .filter((message: ChatMessageType) => message.channelID === props.activeChannelId)
        .map((message: ChatMessageType) => (
          <EachChatMessage
            key={message.messageID}
            message={message}
          />
        ))}
    </div>
  );
}

export default ChatChannelMessages;
