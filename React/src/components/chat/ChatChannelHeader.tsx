import { useEffect, useState } from "react";
import API from "../../API/API";

type ChatChannelHeaderProps = {
  activeChannelID: number;
};

function ChatChannelHeader(props: ChatChannelHeaderProps) {
  const [ChannelName, setChannelName] = useState("default");

  useEffect(() => {
    const getChannelName = async () => {
      const { data } = await API.Channels.findName(props.activeChannelID);
      setChannelName(data.ChannelName);
    };
    getChannelName();
  }, [props, setChannelName]);
  return <div>Current channel: {ChannelName}</div>;
}

export default ChatChannelHeader;
