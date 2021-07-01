
type ChatChannelHeaderProps = {
  channelId: number;
}

function ChatChannelHeader(props: ChatChannelHeaderProps) {
  console.log("ChatChannelHeader");
  // need to map to channelName
  return (<div>Active channel: {props.channelId}</div>);
}

export default ChatChannelHeader;
