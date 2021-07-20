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

  console.log("props are", props);
  useEffect(() => {
    let users : User[] = [];
    const getUsers = async () => {
      const {data} = await API.Channels.index(props.directChannel.Id)
      console.log("data is ", data);
      users = data.users;
    }
    const setChannelName = () => {
      console.log("users is ", users);
      if (users.length === 2) {
        users.forEach((user) => {
          if (user.username !== props.ActiveUserName)
            setDirectChannelName(user.username);
        });
      }
    };
    getUsers();
    setChannelName();
  }, [props.ActiveUserName, props.directChannel.users, props.directChannel.Id]);

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
