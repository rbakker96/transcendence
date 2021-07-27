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
  const [Users, setUsers] = useState<any>([]);

  useEffect(() => {
    let mounted = true;
    const getUsers = async () => {
      const { data } = await API.Channels.getChannelUsers(
        props.directChannel.Id
      );
      if (mounted)
        setUsers(data);
    };
    getUsers();
    return () => {mounted = false;}
  }, [props.directChannel.Id]);

  useEffect(() => {
    let mounted = true;
    const setChannelName = () => {
      if (Users.length === 2) {
        Users.forEach((channelUser: any) => {
          if (channelUser.user.username !== props.ActiveUserName && mounted) {
            setDirectChannelName(channelUser.user.username);
          }
        });
      }
    };
    setChannelName();
    return () => {mounted = false;}
  }, [
    props.ActiveUserName,
    props.directChannel.users,
    props.directChannel.Id,
    Users,
  ]);

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
