import { Divider } from "antd";
import API from "../../API/API";
import {useEffect, useState} from "react";
import {Channel} from "../../Models/Channel.model";


type RenderDirectMessageType = {
  setActiveId: Function;
};

function RenderDirectMessage(props: RenderDirectMessageType) {
  const [DirectMessage, setDirectMessage] = useState<Array<Channel>>([]);
  function setActiveChannelId(activeChannelId: number) {
    props.setActiveId(activeChannelId);
    console.log("Clicked channelID: " + activeChannelId);
  }

  useEffect(() => {
    const getPrivate = async () => {
      // @ts-ignore
      const {data} = await API.Channels.index();
      let result = [];
      result = data.filter((newData : any) => {
        return newData.IsPrivate == true;
      })
      setDirectMessage(result);

    }
    getPrivate();
  }, [])

  return (
    <div>
      <Divider orientation={"left"}>Direct Messages</Divider>
      {DirectMessage.map((item: any) => (
        <ul
          key={item.Id}
          onClick={() => setActiveChannelId(item.Id)}
        >
          {item.ChannelName}
        </ul>
      ))}
    </div>
  );
}

export default RenderDirectMessage;
