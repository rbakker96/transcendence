import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import ChatContent from "../components/chat/ChatContent/ChatContent";
import ChatSidebar from "../components/chat/LeftSideBar/ChatSidebar";
import CurrentUserBar from "../components/chat/CurrentUserBar/CurrentUserBar";
import API from "../API/API";
import "./ChatPage.css"
import axios from "axios";
import {Redirect} from "react-router-dom";

function ChatPage() {
  const [unauthorized, setUnauthorized] = useState(false);
  const [ActiveChannelID, setActiveChannelID] = useState(0);
  const [ActiveUserID, setActiveUserID] = useState<number>(0);
  const [ActiveUserName, setActiveUserName] = useState("");
  const [Avatar, setAvatar] = useState("");
  const [IDIsMuted, setIDIsMuted] = useState<number[]>([]);

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
    const setActiveID = async () => {
      const { data } = await API.User.getActiveUserID();
      setActiveUserID(data.activeUserID);
    };

    const getUser = async () => {
      const { data } = await API.User.findName(ActiveUserID);
      setActiveUserName(data.username);
      setAvatar(data.avatar);
    };
    setActiveID();
    getUser();
  }, [ActiveUserID]);

  if (unauthorized)
    return <Redirect to={'/'}/>;

  return (
    <div className="chatpage">
      <CurrentUserBar Avatar={Avatar} UserName={ActiveUserName} />
      <Row >
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
            IDIsMuted={IDIsMuted}
            setIDIsMuted={setIDIsMuted}
          />
        </Col>
      </Row>
    </div>
  );
}

export default ChatPage;
