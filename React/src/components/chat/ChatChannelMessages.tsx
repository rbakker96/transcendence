import EachChatMessage from "./EachChatMessage";

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

function ChatChannelMessages(props: ChatChannelMessagesProps) {
  console.log("Entered ChatChannelMessages");

  return (
    <div>
      {props.allChatMessages
        .filter((message) => message.channelId === props.activeChannelId)
        .map((message) => (
            <EachChatMessage
              key={message.messageId}
              userId={message.userId}
              userName={message.userName}
              userAvatar={message.userAvatar}
              messageTimeStamp={message.messageTimeStamp}
              messageContent={message.messageContent}
              channelName={message.channelName}
            />
        ))}
    </div>
  );
}

export default ChatChannelMessages;
