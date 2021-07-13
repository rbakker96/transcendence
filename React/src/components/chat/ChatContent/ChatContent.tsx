import ChatChannelHeader from "./ChatChannelHeader";
import ChatChannelMessages from "./ChatChannelMessages";

type ChatContentProps = {
  activeChannelID: number;
};

function ChatContent(props: ChatContentProps) {
  const active_channel_ID = props.activeChannelID;

  return (
    <div>
      <ChatChannelHeader activeChannelID={active_channel_ID} />
      {active_channel_ID
        ? <ChatChannelMessages activeChannelID={active_channel_ID} />
        : <div />
      }
    </div>
  );
}

export default ChatContent;
