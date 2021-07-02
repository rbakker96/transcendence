import EachChatMessage from "./EachChatMessage";
import { useEffect, useState } from "react";
import API from "../../API/API";

type ChatChannelMessagesProps = {
  activeChannelId: number;
};

type ChatMessageType = {
  messageID: number;
  channelID: number;
  senderID: number;
  messageContent: string;
  messageTimestamp: string;
};

function ChatChannelMessages(props: ChatChannelMessagesProps) {
  const [allChatMessages, setAllChatMessages] = useState([]);

  useEffect(() => {
    const getChatMessages = async () => {
      const { data } = await API.ChatMessage.getAllChatMessages();
      console.log(data);
      setAllChatMessages(data);
    };
    getChatMessages();
  }, [props, setAllChatMessages]);

  return (
    <div>
      {allChatMessages
        .filter(
          (message: ChatMessageType) =>
            message.channelID === props.activeChannelId
        )
        .map((message: ChatMessageType) => (
          <EachChatMessage key={message.messageID} message={message} />
        ))}
    </div>
  );
}

export default ChatChannelMessages;
