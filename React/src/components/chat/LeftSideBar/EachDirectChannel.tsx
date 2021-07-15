import { Channel } from "../../../models/Channel.model";
import { SyntheticEvent, useEffect, useState } from "react";

type EachDirectChannelType = {
  setActiveChannelId: Function;
  ActiveUserName: string;
  directChannel: Channel;
};

function EachDirectChannel(props: EachDirectChannelType) {
  const [DirectChannelName, setDirectChannelName] = useState("");

  useEffect(() => {
    const setChannelName = () => {
      const users = props.directChannel.users;
      if (users.length === 2) {
        users.forEach((user) => {
          if (user.username !== props.ActiveUserName)
            setDirectChannelName(user.username);
        });
      }
    };
    setChannelName();
  }, [props.ActiveUserName, props.directChannel.users]);

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
