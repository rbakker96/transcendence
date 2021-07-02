import { useEffect, useState } from "react";
import API from "../../API/API";

type ChatChannelHeaderProps = {
  activeChannelID: number;
};

function ChatChannelHeader(props: ChatChannelHeaderProps) {
  const [ChannelName, setChannelName] = useState("");

  useEffect(() => {
    const getChannelName = async () => {
      const { data } = await API.Channels.findName(props.activeChannelID);
      setChannelName(data.ChannelName);
    };
    getChannelName();
  }, [props, setChannelName]);

  if (!props.activeChannelID)
    return (<div>Select a channel on the left to view the conversations</div>);
  else
    return <div>Current channel: {ChannelName}</div>;
}

export default ChatChannelHeader;
