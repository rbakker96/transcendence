import { Divider } from "antd";
import API from "../../../API/API";
import { useEffect, useState } from "react";
import { Channel } from "../../../models/Channel.model";
import EachDirectChannel from "./EachDirectChannel";

type RenderDirectMessageType = {
  setActiveChannelId: Function;
  ActiveUserName: string;
};

function RenderDirectMessage(props: RenderDirectMessageType) {
  const [DirectChannels, setDirectChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const getchannels = async () => {
      const { data } = await API.Channels.index();
      let result: Channel[];
      result = data.filter((channel: any) => channel.IsDirect);
      setDirectChannels(result);
    };
    getchannels();
  }, []);

  return (
    <div>
      <Divider orientation={"left"} style={{ color: "#5B8FF9" }}>
        Direct messages
      </Divider>
      {DirectChannels.map((channel: Channel) => (
        <EachDirectChannel
          setActiveChannelId={props.setActiveChannelId}
          ActiveUserName={props.ActiveUserName}
          directChannel={channel}
        />
      ))}
    </div>
  );
}

export default RenderDirectMessage;
