import { Divider } from "antd";
import API from "../../../API/API";
import { useEffect, useState } from "react";
import { Channel } from "../../../models/Channel.model";
import EachDirectChannel from "./EachDirectChannel";

type RenderDirectMessageType = {
  setActiveChannelId: Function;
  ActiveUserName: string;
  ActiveUserId : number;
};

function RenderDirectMessage(props: RenderDirectMessageType) {
  const [DirectChannels, setDirectChannels] = useState<Array<Channel>>([]);

  useEffect(() => {
    const getchannels = async () => {
      const { data } = await API.User.getChannels(props.ActiveUserId);
      let result: Channel[];
      result = data.filter((channel: any) => channel.IsDirect);
      setDirectChannels(result);
    };
    getchannels();
  }, [props.ActiveUserId]);

  console.log("Hoeveel directchannels should be there", DirectChannels);
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
