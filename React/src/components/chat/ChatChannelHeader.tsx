
type ChatChannelHeaderProps = {
  channelId: number;
}

function ChatChannelHeader(props: ChatChannelHeaderProps) {
  console.log("ChatChannelHeader");

  return (<div>Active channel: {props.channelId}</div>);
}

export default ChatChannelHeader;
