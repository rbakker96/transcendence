import ChatChannelHeader from "./ChatChannelHeader";
import ChatChannelMessages from "./ChatChannelMessages";

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
      />
    </div>
  );
}

export default ChatContent;
