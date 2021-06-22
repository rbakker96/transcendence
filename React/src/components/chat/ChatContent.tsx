import ChatChannelHeader from "./ChatChannelHeader";
import ChatChannelMessages from "./ChatChannelMessages";
import 'antd/dist/antd.css';

const MESSAGE_DATA = [
  {
    messageId: 1,
    userId: 1,
    userName: "user1",
    userAvatar: "https://i.pravatar.cc/300",
    messageTimeStamp:
      "Tue Jun 22 2021 13:19:43",
    messageContent: "this is my 1st message",
    channelId: 1,
    channelName: "Channel1",
  },
  {
    messageId: 2,
    userId: 2,
    userName: "user2",
    userAvatar: "https://i.pravatar.cc/301",
    messageTimeStamp:
      "Tue Jun 22 2021 13:20:33",
    messageContent: "this is my 1st message",
    channelId: 2,
    channelName: "Channel2",
  },
  {
    messageId: 3,
    userId: 1,
    userName: "user1",
    userAvatar: "https://i.pravatar.cc/300",
    messageTimeStamp:
      "Tue Jun 22 2021 13:20:40",
    messageContent: "this is my 2nd message",
    channelId: 1,
    channelName: "Channel1",
  },
  {
    messageId: 4,
    userId: 2,
    userName: "user2",
    userAvatar: "https://i.pravatar.cc/301",
    messageTimeStamp:
      "Tue Jun 22 2021 13:20:52",
    messageContent: "this is my 2nd message",
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
