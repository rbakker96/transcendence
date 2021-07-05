import ChatChannelHeader from "./ChatChannelHeader";
import ChatChannelMessages from "./ChatChannelMessages";
import ChatInputBar from "./ChatInputBar";

type ChatContentProps = {
  activeChannelID: number;
};

function ChatContent(props: ChatContentProps) {
  const active_channel_ID = props.activeChannelID;

  return (
    <div>
      <ChatChannelHeader activeChannelID={active_channel_ID} />
      <ChatChannelMessages activeChannelID={active_channel_ID} />
      <ChatInputBar activeChannelID={active_channel_ID} />
    </div>
  );
}

export default ChatContent;
