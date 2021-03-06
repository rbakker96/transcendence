import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import ChatContent from "./ChatContent/ChatContent";
import ChatSidebar from "./LeftSideBar/ChatSidebar";
import CurrentUserBar from "./CurrentUserBar/CurrentUserBar";
import API from "../../API/API";
import axios from "axios";
import { Redirect } from "react-router-dom";

function ChatPage() {
  const [unauthorized, setUnauthorized] = useState(false);
  const [ActiveChannelID, setActiveChannelID] = useState(0);
  const [ActiveUserID, setActiveUserID] = useState<number>(0);
  const [ActiveUserName, setActiveUserName] = useState("");
  const [Avatar, setAvatar] = useState("");

  useEffect(() => {
    let mounted = true;
    const authorization = async () => {
      try {
        await axios.get("userData");
      } catch (err) { if (mounted) setUnauthorized(true); }
    };
    authorization();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    const setActiveID = async () => {
      try {
        const { data } = await API.User.getActiveUserID();
        if (mounted) setActiveUserID(data.activeUserID);
      } catch (err) { if (mounted) setUnauthorized(true); }
    };

    const getUser = async () => {
      try {
        const { data } = await API.User.findName(ActiveUserID);
        if (mounted) {
          setActiveUserName(data.username);
          setAvatar(data.avatar);
        }
      } catch (err) { if (mounted) setUnauthorized(true); }
    };
    setActiveID();
    getUser();
    return () => { mounted = false; };
  }, [ActiveUserID]);

  if (unauthorized) return <Redirect to={"/"} />;
  else
    return (
      <div>
        <CurrentUserBar Avatar={Avatar} UserName={ActiveUserName} />
        <Row>
          <Col className="gutter-row" span={4}>
            <ChatSidebar
              setActiveId={setActiveChannelID}
              ActiveUserName={ActiveUserName}
              ActiveUserId={ActiveUserID}
              ActiveChannelId={ActiveChannelID}
            />
          </Col>
          <Col className="gutter-row" span={20}>
            <ChatContent
              activeChannelID={ActiveChannelID}
              setActiveChannelID={setActiveChannelID}
              activeUserID={ActiveUserID}
            />
          </Col>
        </Row>
      </div>
    );
}

export default ChatPage;
