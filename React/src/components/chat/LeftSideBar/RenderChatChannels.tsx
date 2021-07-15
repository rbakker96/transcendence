import { Divider } from "antd";
import API from "../../../API/API";
import React, { useEffect, useState } from "react";
import {FaLock} from 'react-icons/fa';
import {Channel} from "../../../models/Channel.model";
import axios from "axios";

type RenderChatChannelsType = {
  setActiveId: Function;
};

function RenderChatChannels (props: RenderChatChannelsType) {
  const [channel, setChannel] = useState<Array<Channel>>([]);
  const [user, setUser] = useState(0);
  function setActiveChannelId(activeChannelId: number) {
    props.setActiveId(activeChannelId);
    console.log("Clicked channelID: " + activeChannelId);
  }

  // here i need to retrieve the current user
  useEffect(() => {
    const getUser = async () => {
      const {data} = await axios.get('userData')
      setUser(data.id);
    }
    getUser();
  }, []);

  useEffect(() => {
    const getchannels = async () => {
      const { data } = await API.Channels.index();
      let result: Channel[];
      result = data.filter((channel : any) => channel.IsDirect === false);
      setChannel(result);
    };
    getchannels();
  }, []);

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
      {channel.map((item: any) => (
        <ul key={item.Id} onClick={() => setActiveChannelId(item.Id)}>
          {item.ChannelName}
          {renderLocks(item)}
        </ul>
      ))}
    </div>
  );
}
export default RenderChatChannels;
