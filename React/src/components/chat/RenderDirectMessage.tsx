import { Divider } from "antd";
import API from "../../API/API";
import React, { useEffect, useState } from "react";
import { Channel} from "../../models/Channel.model";


type RenderDirectMessageType = {
  setActiveId: Function;
};

function RenderDirectMessage (props: RenderDirectMessageType) {
  const [channel, setChannel] = useState<Array<Channel>>([]);

  function setActiveChannelId(activeChannelId: number) {
    props.setActiveId(activeChannelId);
    console.log("Clicked channelID: " + activeChannelId);
  }

  useEffect(() => {
    const getchannels = async () => {
      const { data } = await API.Channels.index();
      let result: Channel[];
      result = data.filter((channel : any) => channel.IsDirect === true);
      setChannel(result);
    };
    getchannels();
  }, []);

  return (
      <div>
        <Divider orientation={"left"} style={{ "color": "#5B8FF9" }}>
          Chat channels
        </Divider>
        {channel.map((item: any) => (
            <dl key={item.Id} onClick={() => setActiveChannelId(item.Id)}>
              <dt> {item.ChannelName}</dt>
              {item.users.map((output : any) =>(
                  <dd> {output.username}</dd>
              ))}
                </dl>
        ))}
      </div>

  );
}


export default RenderDirectMessage;
