import { Divider } from "antd";
import API from "../../../API/API";
import React, { useEffect, useState } from "react";
import { Channel } from "../../../models/Channel.model";
import EachDirectChannel from "./EachDirectChannel";
import {Redirect} from "react-router-dom";
import axios from "axios";

type RenderDirectMessageType = {
  setActiveChannelId: Function;
  ActiveUserName: string;
  ActiveUserId : number;
  ActiveChannelID : number;
};

function RenderDirectMessage(props: RenderDirectMessageType) {
  const [DirectChannels, setDirectChannels] = useState<Array<Channel>>([]);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    let mounted = true;

    const authorization = async () => {
      try { await axios.get('userData'); }
      catch(err){
        if(mounted)
          setUnauthorized(true);
      }
    }
    authorization();
    return () => {mounted = false;}
  }, []);

  useEffect(() => {
    const getChannels = async () => {
      try {
        const { data } = await API.Channels.getWithUser(props.ActiveUserId);
        if (data)
        {
          let result: Channel[];
          result = data.filter((channel : any) => channel.IsDirect);
          setDirectChannels(result);
        }
      }catch (err) {setUnauthorized(true);}
    };
    getChannels();
  }, [props.ActiveUserId, props.ActiveChannelID]);

  if (unauthorized)
    return <Redirect to={'/'}/>;

  return (
    <div>
      <Divider orientation={"left"} style={{ color: "#5B8FF9" }}>
        Direct messages
      </Divider>
      {DirectChannels.map((channel: Channel) => (
        <EachDirectChannel
          key={channel.Id}
          setActiveChannelId={props.setActiveChannelId}
          ActiveUserName={props.ActiveUserName}
          directChannel={channel}
        />
      ))}
    </div>
  );
}

export default RenderDirectMessage;
