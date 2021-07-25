import { Channel } from "../../../models/Channel.model";
import { SyntheticEvent, useEffect, useState } from "react";
import API from "../../../API/API";

type EachDirectChannelType = {
  setActiveChannelId: Function;
  ActiveUserName: string;
  directChannel: Channel;
};

function EachDirectChannel(props: EachDirectChannelType) {
  const [DirectChannelName, setDirectChannelName] = useState("");
  const [Users , setUsers] = useState<any>([])

  useEffect(() => {
    const getUsers = async ()  => {
      const {data} = await API.Channels.getChannelUsers(props.directChannel.Id)
      setUsers(data);
    }
    getUsers();
  }, [props.directChannel.Id])

  useEffect(() => {
    const setChannelName = () => {
      console.log("length = ", Users.length)
      if (Users.length === 2) {
        Users.forEach((channelUser: any ) => {
          console.log("active username = ", props.ActiveUserName);
          if (channelUser.user.username !== props.ActiveUserName)
          {
            setDirectChannelName(channelUser.user.username);
            console.log("HALLOO", DirectChannelName);
          }
        });
      }
    };
    setChannelName();
  }, [props.ActiveUserName, props.directChannel.users, props.directChannel.Id, Users]);

  function onclick(e: SyntheticEvent) {
    e.preventDefault();
    props.setActiveChannelId(props.directChannel.Id);
  }

  return (
    <ul key={props.directChannel.Id} onClick={onclick}>
      {DirectChannelName}
    </ul>
  );
}

export default EachDirectChannel;
