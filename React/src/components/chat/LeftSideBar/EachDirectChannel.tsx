import { Channel } from "../../../models/Channel.model";
import { SyntheticEvent, useEffect, useState } from "react";
import {User} from "../../../models/User.model";
import API from "../../../API/API";

type EachDirectChannelType = {
  setActiveChannelId: Function;
  ActiveUserName: string;
  directChannel: Channel;
};

function EachDirectChannel(props: EachDirectChannelType) {
  const [DirectChannelName, setDirectChannelName] = useState("");
  const [Users , setUsers] = useState<Array<User>>([])

  useEffect(() => {
    const getUsers = async ()  => {
      const {data} = await API.Channels.index(props.directChannel.Id)
      setUsers(data.users);
    }
    getUsers();
  }, [props.directChannel.Id])

  useEffect(() => {
    const setChannelName = () => {
      if (Users.length === 2) {
        Users.forEach((user) => {
          if (user.username !== props.ActiveUserName)
            setDirectChannelName(user.username);
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
