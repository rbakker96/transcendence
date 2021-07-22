import React, { useEffect, useState } from "react";
import API from "../../../API/API";
import { Divider } from "antd";
import {Redirect} from "react-router-dom";


type ChatChannelHeaderProps = {
  activeChannelID: number;
  activeUserID : number
};

function ChatChannelHeader(props: ChatChannelHeaderProps) {
  const [ChannelName, setChannelName] = useState("");
  const [admins, setAdmins] = useState<boolean>();
  const [toAdmins, setToAdmins] = useState<boolean>(false);

  useEffect(() => {
    const getChannelName = async () => {
      console.log("Hoevaak kom ik hierin?")
      if (props.activeChannelID) {
        const { data } = await API.Channels.findName(props.activeChannelID);
        setChannelName(data.ChannelName);
      } else setChannelName("Select a channel on the left to view messages");
    };
    getChannelName();
  }, [props, setChannelName]);


  useEffect(() => {
    const getAdmins = async () => {
      const {data} = await API.Channels.getAdmins(props.activeChannelID, props.activeUserID);
      setAdmins(data);
    }
    getAdmins()
  }, [props, setAdmins])

  function leaveChannel()
  {
    const deleteUser = async () => {
      await API.Channels.leaveChannel(props.activeUserID, props.activeChannelID)
    }
    deleteUser();
  }

  function goToAdminSettings()
  {
      setToAdmins(true);
  }

  if (toAdmins === true)
  {
      console.log("active channel in the redirect = ", props.activeChannelID);
      return (
          <Redirect to={{
              pathname: "/adminSetting",
              state: {activeChannelId: props.activeChannelID}
          }}
          />
      )
  }

  if (admins === true)
  {
      console.log("kom ik hier nog wel")
    return(
        <div>
          <Divider orientation={"center"} style={{ color: "#5B8FF9" }}>
            {ChannelName}
          </Divider>
        <button type="button" className="btn btn-outline-danger" onClick={leaveChannel}>Leave Channel</button>
        <button type="button" className="btn btn-primary" onClick={goToAdminSettings} >Go to admin settings</button>
        </div>
        )
  }
  else if(ChannelName !== "Select a channel on the left to view messages")
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
