import ChatChannelHeader from "./ChatChannelHeader";
import ChatChannelMessages from "./ChatChannelMessages";

const MESSAGE_DATA = [
  {
    messageId: 1,
    userId: 1,
    userName: "user1",
    userAvatar: "https://i.pravatar.cc/300",
    messageTimeStamp:
      "Tue Jun 22 2021 13:19:43 GMT+0200 (Central European Summer Time)",
    messageContent: "user1: this is my 1st message",
    channelId: 1,
    channelName: "Channel1",
  },
  {
    messageId: 2,
    userId: 2,
    userName: "user2",
    userAvatar: "https://i.pravatar.cc/301",
    messageTimeStamp:
      "Tue Jun 22 2021 13:20:33 GMT+0200 (Central European Summer Time)",
    messageContent: "user2: this is my 1st message",
    channelId: 2,
    channelName: "Channel2",
  },
  {
    messageId: 3,
    userId: 1,
    userName: "user1",
    userAvatar: "https://i.pravatar.cc/300",
    messageTimeStamp:
      "Tue Jun 22 2021 13:20:40 GMT+0200 (Central European Summer Time)",
    messageContent: "user1: this is my 2nd message",
    channelId: 1,
    channelName: "Channel1",
  },
  {
    messageId: 4,
    userId: 2,
    userName: "user2",
    userAvatar: "https://i.pravatar.cc/301",
    messageTimeStamp:
      "Tue Jun 22 2021 13:20:52 GMT+0200 (Central European Summer Time)",
    messageContent: "user2: this is my 2nd message",
    channelId: 2,
    channelName: "Channel2",
  },
];

type ChatContentProps = {
  activeChannelId: number;
};

function ChatContent(props: ChatContentProps) {

  console.log("Entered ChatContent");
  const active_channel_id = props.activeChannelId;

  return (
    <div>
      <ChatChannelHeader
        channelId={active_channel_id}
      />
      <ChatChannelMessages
        activeChannelId={active_channel_id}
        allChatMessages={MESSAGE_DATA}
      />
    </div>
  );
}

export default ChatContent;
