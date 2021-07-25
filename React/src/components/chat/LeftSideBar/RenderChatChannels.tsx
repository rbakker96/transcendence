import { Divider } from "antd";
import API from "../../../API/API";
import React, { useEffect, useState } from "react";
import {FaLock} from 'react-icons/fa';
import {Channel} from "../../../models/Channel.model";
import axios from "axios";

type RenderChatChannelsType = {
  setActiveId: Function;
  ActiveUserId : number;
};

function RenderChatChannels (props: RenderChatChannelsType) {
  const [channel, setChannel] = useState<Array<Channel>>([]);

  console.log(props.ActiveUserId, "Render chat channels userid");
  function setActiveChannelId(activeChannelId: number) {
    props.setActiveId(activeChannelId);
    console.log("Clicked channelID: " + activeChannelId);
  }

  useEffect(() => {
    const getChannels = async () => {
      const { data } = await API.Channels.getWithUser(props.ActiveUserId);
      console.log("data in chat channel is", data);
      if (data)
      {
        let result: Channel[];
        result = data.filter((channel : any) => !channel.IsDirect);
        setChannel(result);
      }
    };
    getChannels();
  }, [props.ActiveUserId]);

  function renderLocks(item : any)
  {
    if (item.IsPrivate === true)
    {
      return (
          <FaLock />
      )
    }
    else
      return ;
  }

  return (
    <div>
      <Divider orientation={"left"} style={{ "color": "#5B8FF9" }}>
        Chat channels
      </Divider>
      {channel.map((item: Channel) => (
        <ul key={item.Id} onClick={() => setActiveChannelId(item.Id)}>
          {item.ChannelName}
          {renderLocks(item)}
        </ul>
      ))}
    </div>
  );
}
export default RenderChatChannels;
