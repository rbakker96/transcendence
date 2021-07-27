import { Divider } from "antd";
import API from "../../../API/API";
import React, { useEffect, useState } from "react";
import {FaLock} from 'react-icons/fa';
import {Channel} from "../../../models/Channel.model";
import {Redirect} from "react-router-dom";

type RenderChatChannelsType = {
  setActiveId: Function;
  ActiveUserId : number;
};

function RenderChatChannels (props: RenderChatChannelsType) {
  const [channel, setChannel] = useState<Array<Channel>>([]);
  const [unauthorized, setUnauthorized] = useState(false);

  function setActiveChannelId(activeChannelId: number) {
    props.setActiveId(activeChannelId);
  }

  useEffect(() => {
    const getChannels = async () => {
      try {
        const { data } = await API.Channels.getWithUser(props.ActiveUserId);
        if (data)
        {
          let result: Channel[];
          result = data.filter((channel : any) => !channel.IsDirect);
          setChannel(result);
        }
      }catch (err) {setUnauthorized(true);}
    };
    getChannels();
  }, [props.ActiveUserId]);

  function renderLocks(item : any) {
    if (item.IsPrivate === true) {
      return (
          <FaLock />
      )
    }
    else
      return ;
  }

  if (unauthorized)
    return <Redirect to={'/'}/>;

  return (
    <div>
      <Divider orientation={"left"} style={{ "color": "#5B8FF9" }}>
        Chat channels
      </Divider>
      {channel.map((item: Channel) => (
        <ul className="chatChannelsLock" key={item.Id} onClick={() => setActiveChannelId(item.Id)}>
          <p className="channelName">{item.ChannelName}</p>
          <p className="lockImg">{renderLocks(item)}</p>
        </ul>
      ))}
    </div>
  );
}
export default RenderChatChannels;
