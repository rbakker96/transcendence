import { Divider } from "antd";
import API from "../../API/API";
import React, { useEffect, useState } from "react";
import { Channel } from "../../Models/Channel.model";
import styles from "./stylesheets/RenderChatChannels.module.css";

type RenderChatChannelsType = {
  setActiveId: Function;
};

function RenderChatChannels(props: RenderChatChannelsType) {
  const [channel, setChannel] = useState<Array<Channel>>([]);
  function setActiveChannelId(activeChannelId: number) {
    props.setActiveId(activeChannelId);
    console.log("Clicked channelID: " + activeChannelId);
  }
  useEffect(() => {
    const getchannels = async () => {
      const { data } = await API.Channels.index();
      setChannel(data);
    };
    getchannels();
  }, []);

  return (
    <div>
      <Divider orientation={"left"} style={{ "color": "#5B8FF9" }}>
        Chat channels
      </Divider>
      {channel.map((item: any) => (
        <ul key={item.Id} onClick={() => setActiveChannelId(item.Id)}>
          {item.ChannelName}
        </ul>
      ))}
    </div>
  );
}
export default RenderChatChannels;
