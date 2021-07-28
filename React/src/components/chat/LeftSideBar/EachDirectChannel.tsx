import { Channel } from "../../../models/Channel.model";
import React, { SyntheticEvent, useEffect, useState } from "react";
import API from "../../../API/API";
import {Redirect} from "react-router-dom";
import axios from "axios";

type EachDirectChannelType = {
  setActiveChannelId: Function;
  ActiveUserName: string;
  directChannel: Channel;
};

function EachDirectChannel(props: EachDirectChannelType) {
  const [DirectChannelName, setDirectChannelName] = useState("");
  const [Users, setUsers] = useState<any>([]);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    let mounted = true;
    const authorization = async () => {
      try {
        await axios.get("userData");
      } catch (err) { if (mounted) setUnauthorized(true); }
    };
    authorization();
    return () => {mounted = false;}
  }, []);

  useEffect(() => {
    let mounted = true;
    const getUsers = async () => {
      try {
        const { data } = await API.Channels.getChannelUsers(
          props.directChannel.Id
        );
        if (mounted) setUsers(data);
      }
      catch (err) { if (mounted) setUnauthorized(true); }
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

  if (unauthorized) return <Redirect to={"/"} />;

  return (
    <ul key={props.directChannel.Id} onClick={onclick}>
      {DirectChannelName}
    </ul>
  );
}

export default EachDirectChannel;
