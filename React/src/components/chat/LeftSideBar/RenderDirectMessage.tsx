import { Divider } from "antd";
import API from "../../../API/API";
import { useEffect, useState } from "react";
import { Channel } from "../../../models/Channel.model";
import EachDirectChannel from "./EachDirectChannel";
import axios from "axios";

type RenderDirectMessageType = {
  setActiveChannelId: Function;
  ActiveUserName: string;
};

function RenderDirectMessage(props: RenderDirectMessageType) {
  const [DirectChannels, setDirectChannels] = useState<Array<Channel>>([]);
  const [user, setUser] = useState( {
    id: 60944,
  })

  function retrieveUser()
  {
    const getUser = async () => {
      const {data} = await axios.get('userData')
      setUser(data.id);
    }
    getUser();
  };

  useEffect(() => {
    const getchannels = async () => {
      console.log("current user = ", user.id);
      const { data } = await API.User.getChannels(user.id);
      let result: Channel[];
      result = data.filter((channel: any) => channel.IsDirect);
      setDirectChannels(result);
    };
    retrieveUser()
    getchannels();
  }, [user]);

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
