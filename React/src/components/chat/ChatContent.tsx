import ChatChannelHeader from "./ChatChannelHeader";
import ChatChannelMessages from "./ChatChannelMessages";

type ChatContentProps = {
  activeChannelID: number;
};

function ChatContent(props: ChatContentProps) {
  const active_channel_ID = props.activeChannelID;

  if (!active_channel_ID) {
    return (
      <div>
        <ChatChannelHeader activeChannelID={active_channel_ID} />
      </div>
    );
  } else {
    return (
      <div>
        <ChatChannelHeader activeChannelID={active_channel_ID} />
        <ChatChannelMessages activeChannelID={active_channel_ID} />
      </div>
    );
  }
}

export default ChatContent;
