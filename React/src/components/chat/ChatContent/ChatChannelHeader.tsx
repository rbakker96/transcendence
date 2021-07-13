import React, { useEffect, useState } from "react";
import API from "../../../API/API";
import { Divider } from "antd";

type ChatChannelHeaderProps = {
  activeChannelID: number;
};

function ChatChannelHeader(props: ChatChannelHeaderProps) {
  const [ChannelName, setChannelName] = useState("");

  useEffect(() => {
    const getChannelName = async () => {
      if (props.activeChannelID) {
        const { data } = await API.Channels.findName(props.activeChannelID);
        setChannelName(data.ChannelName);
      } else setChannelName("Select a channel on the left to view messages");
    };
    getChannelName();
  }, [props, setChannelName]);

  return (
    <div>
      <Divider orientation={"center"} style={{ color: "#5B8FF9" }}>
        {ChannelName}
      </Divider>
    </div>
  );
}

export default ChatChannelHeader;