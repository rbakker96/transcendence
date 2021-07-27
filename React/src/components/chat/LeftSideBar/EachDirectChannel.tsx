import { Channel } from "../../../models/Channel.model";
import React, { SyntheticEvent, useEffect, useState } from "react";
import API from "../../../API/API";
import {FaLock} from "react-icons/fa";

type EachDirectChannelType = {
  setActiveChannelId: Function;
  ActiveUserName: string;
  directChannel: Channel;
  private: boolean;
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
      if (Users.length === 2) {
        Users.forEach((channelUser: any ) => {
          if (channelUser.user.username !== props.ActiveUserName) {
            setDirectChannelName(channelUser.user.username);
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

  function renderLocks(item : any) {
    if (item === true){
      return (
          <FaLock />
      )
    }
    else
      return ;
  }

  return (
    <ul className="chatChannelsLock" key={props.directChannel.Id} onClick={onclick}>
      <p className="channelName">{DirectChannelName}</p>
      <p className="lockImg">{renderLocks(props.private)}</p>
    </ul>
  );
}

export default EachDirectChannel;
