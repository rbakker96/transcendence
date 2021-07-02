import ChatChannelHeader from "./ChatChannelHeader";
import ChatChannelMessages from "./ChatChannelMessages";

type ChatContentProps = {
  activeChannelId: number;
};

function ChatContent(props: ChatContentProps) {
  const active_channel_id = props.activeChannelId;

  return (
    <div>
      <ChatChannelHeader activeChannelID={active_channel_id} />
      <ChatChannelMessages activeChannelID={active_channel_id} />
    </div>
  );
}

export default ChatContent;
