import EachChatMessage from "./EachChatMessage";
import {useEffect, useState} from "react";
import API from "../../API/API";

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
      const {data} = await API.ChatMessage.getAllChatMessages();
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
