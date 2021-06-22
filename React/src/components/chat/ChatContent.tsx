import ChatChannelHeader from "./ChatChannelHeader";
import ChatChannelMessages from "./ChatChannelMessages";
import 'antd/dist/antd.css';

const MESSAGE_DATA = [
  {
    messageId: 1,
    userId: 1,
    userName: "qing",
    userAvatar: "https://i.pravatar.cc/300",
    messageTimeStamp:
      "Tue Jun 22 2021 13:19:43",
    messageContent: "this is my 1st message. Build encapsulated components that manage their own state, then compose them to make complex UIs.",
    channelId: 1,
    channelName: "Channel1",
  },
  {
    messageId: 2,
    userId: 2,
    userName: "li",
    userAvatar: "https://i.pravatar.cc/301",
    messageTimeStamp:
      "Tue Jun 22 2021 13:20:33",
    messageContent: "this is my 1st message. React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
    channelId: 2,
    channelName: "Channel2",
  },
  {
    messageId: 3,
    userId: 1,
    userName: "qing",
    userAvatar: "https://i.pravatar.cc/300",
    messageTimeStamp:
      "Tue Jun 22 2021 13:20:40",
    messageContent: "this is my 2nd message. Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.",
    channelId: 1,
    channelName: "Channel1",
  },
  {
    messageId: 4,
    userId: 2,
    userName: "li",
    userAvatar: "https://i.pravatar.cc/301",
    messageTimeStamp:
      "Tue Jun 22 2021 13:20:52",
    messageContent: "this is my 2nd message. We don’t make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code.",
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
