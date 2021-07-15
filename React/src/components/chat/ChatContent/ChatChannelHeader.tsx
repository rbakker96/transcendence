import React, { useEffect, useState } from "react";
import API from "../../../API/API";
import { Divider } from "antd";
import axios from "axios";

type ChatChannelHeaderProps = {
  activeChannelID: number;
};

function ChatChannelHeader(props: ChatChannelHeaderProps) {
  const [ChannelName, setChannelName] = useState("");
  const [user, setUser] = useState(0);

  useEffect(() => {
    const getChannelName = async () => {
      if (props.activeChannelID) {
        const { data } = await API.Channels.findName(props.activeChannelID);
        setChannelName(data.ChannelName);
      } else setChannelName("Select a channel on the left to view messages");
    };
    getChannelName();
  }, [props, setChannelName]);

  useEffect(() => {
    const getUser = async () => {
      const {data} = await axios.get('userData')
      setUser(data.id);
    }
    getUser();
  }, []);

  function leaveChannel()
  {
    console.log("user id = :", user)
    console.log("channel id = :", props.activeChannelID)
    const deleteUser = async () => {
      await API.Channels.leaveChannel(user, props.activeChannelID)
    }
    deleteUser();
  }

  if(ChannelName !== "Select a channel on the left to view messages")
  {
    return (
        <div>
          <Divider orientation={"center"} style={{ color: "#5B8FF9" }}>
            {ChannelName}
          </Divider>
          <button type="button" className="btn btn-outline-danger" onClick={leaveChannel}>Leave Channel</button>
        </div>
    );
  }
  else
  {
    return (
        <div>
          <Divider orientation={"center"} style={{ color: "#5B8FF9" }}>
            {ChannelName}
          </Divider>
        </div>
    );
  }


}

export default ChatChannelHeader;
