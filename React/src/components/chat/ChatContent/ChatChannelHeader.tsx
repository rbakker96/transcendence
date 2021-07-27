import React, { useEffect, useState } from "react";
import API from "../../../API/API";
import { Divider } from "antd";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./ChatContent.css";
import LeaveChannelButton from "./LeaveChannelButton";

type ChatChannelHeaderProps = {
  activeChannelID: number;
  activeUserID: number;
  setActiveChannelID: Function;
  isDirect: boolean;
};

function ChatChannelHeader(props: ChatChannelHeaderProps) {
  const [ChannelName, setChannelName] = useState("");
  const [IsAdmin, setIsAdmin] = useState<boolean>(false);
  const [redirectToAdmins, setRedirectToAdmins] = useState<boolean>(false);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    let mounted = true;
    const authorization = async () => {
      try {
        await axios.get("userData");
      } catch (err) {
        if (mounted) setUnauthorized(true);
      }
    };
    authorization();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const getChannelName = async () => {
      if (props.activeChannelID) {
        try {
          const { data } = await API.Channels.findName(props.activeChannelID);
          setChannelName(data.ChannelName);
        } catch (err) {
          setUnauthorized(true);
        }
      } else setChannelName("Select a channel on the left to view messages");
    };
    getChannelName();
  }, [props.activeChannelID]);

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const { data } = await API.Channels.getIsAdmin(
          props.activeUserID,
          props.activeChannelID
        );
        setIsAdmin(data);
      } catch (err) {
        setUnauthorized(true);
      }
    };
    getAdmins();
  }, [props.activeUserID, props.activeChannelID]);

  if (unauthorized) return <Redirect to={"/"} />;

  if (redirectToAdmins) {
    return (
      <Redirect
        to={{
          pathname: "/adminSetting",
          state: { activeChannelId: props.activeChannelID },
        }}
      />
    );
  }

  return (
    <div>
      <Divider orientation={"center"} style={{ color: "#5B8FF9" }}>
        {ChannelName}
      </Divider>
      <div className="buttonsBar">
        {props.activeChannelID ? (
          <LeaveChannelButton
            activeChannelID={props.activeChannelID}
            activeUserID={props.activeUserID}
          />
        ) : null}
        {(IsAdmin && !props.isDirect) ? (
          <button
            type="button"
            className="btn btn-primary adminPanel"
            onClick={() => setRedirectToAdmins(true)}
          >
            Admin panel
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default ChatChannelHeader;
