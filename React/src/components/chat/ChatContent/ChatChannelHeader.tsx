import React, { useEffect, useState } from "react";
import API from "../../../API/API";
import { Divider } from "antd";
import {Redirect} from "react-router-dom";
import axios from "axios";
import "./ChatContent.css"

type ChatChannelHeaderProps = {
    activeChannelID: number;
    activeUserID : number;
    setActiveChannelID: Function;
};

function ChatChannelHeader(props: ChatChannelHeaderProps) {
  const [ChannelName, setChannelName] = useState("");
  const [admins, setAdmins] = useState<boolean>();
  const [toAdmins, setToAdmins] = useState<boolean>(false);
  const [unauthorized, setUnauthorized] = useState(false);

    useEffect(() => {
        let mounted = true;

        const authorization = async () => {
            try { await axios.get('userData'); }
            catch(err){
                if(mounted)
                    setUnauthorized(true);
            }
        }
        authorization();
        return () => {mounted = false;}
    }, []);

  useEffect(() => {
    const getChannelName = async () => {
      if (props.activeChannelID) {
          try {
              const { data } = await API.Channels.findName(props.activeChannelID);
              setChannelName(data.ChannelName);
          } catch (err) {
              {setUnauthorized(true);}
          }

      }
      else setChannelName("Select a channel on the left to view messages");
    };
    getChannelName();
  }, [props, setChannelName]);

    useEffect(() => {
        const getAdmins = async () => {
            try {
                const {data} = await API.Channels.getIsAdmin(props.activeUserID, props.activeChannelID);
                setAdmins(data);
            }
            catch (err) {
                {setUnauthorized(true);}
            }
        }
        getAdmins()
    }, [props, setAdmins])

  function leaveChannel()
  {
    const deleteUser = async () => {
        try {
            await API.Channels.leaveChannel(props.activeUserID, props.activeChannelID)
        }
        catch (err) {
            {setUnauthorized(true);}
        }
    }
    deleteUser();
    props.setActiveChannelID(0);
  }

  function goToAdminSettings() {
      setToAdmins(true);
  }

  if (unauthorized)
      return <Redirect to={'/'}/>;

  if (toAdmins) {
      console.log("active channel in the redirect = ", props.activeChannelID);
      return (
          <Redirect to={{
              pathname: "/adminSetting",
              state: {activeChannelId: props.activeChannelID}
          }}
          />
      )
  }

  if (admins === true) {
    return(
        <div>
          <Divider orientation={"center"} style={{ color: "#5B8FF9" }}>
            {ChannelName}
          </Divider>
        <div className="buttonsBar">
            <button type="button" className="btn btn-danger leaveChannel" onClick={leaveChannel}>Leave Channel</button>
            <button type="button" className="btn btn-primary adminPanel" onClick={goToAdminSettings} >Admin panel</button>
        </div>
        </div>
    )
  }
  else if(ChannelName !== "Select a channel on the left to view messages") {
    return (
        <div>
          <Divider orientation={"center"} style={{ color: "#5B8FF9" }}>
            {ChannelName}
          </Divider>
          <div className="buttonsBar">
              <button type="button" className="btn btn-danger leaveChannel" onClick={leaveChannel}>Leave Channel</button>
          </div>
        </div>
    );
  }
  else {
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
