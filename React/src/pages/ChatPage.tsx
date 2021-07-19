import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import ChatContent from "../components/chat/ChatContent/ChatContent";
import ChatSidebar from "../components/chat/LeftSideBar/ChatSidebar";
import CurrentUserBar from "../components/chat/CurrentUserBar/CurrentUserBar";
import API from "../API/API";
import "./ChatPage.css"

function ChatPage() {
  const [ActiveChannelID, setActiveChannelID] = useState(0);
  const [ActiveUserID, setActiveUserID] = useState<number>(0);
  const [ActiveUserName, setActiveUserName] = useState("");
  const [Avatar, setAvatar] = useState("");
  const [IDIsMuted, setIDIsMuted] = useState<number[]>([]);

  useEffect(() => {
    const setActiveID = async () => {
      const { data } = await API.User.getActiveUserID();
      setActiveUserID(data.activeUserID);
    };
    setActiveID();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await API.User.findName(ActiveUserID);
      setActiveUserName(data.username);
      setAvatar(data.avatar);
    };
    getUser();
  }, [ActiveUserID]);

  return (
    <div className="chatpage">
      <CurrentUserBar Avatar={Avatar} UserName={ActiveUserName} />
      <Row >
        <Col className="gutter-row" span={4}>
          <ChatSidebar
            setActiveId={setActiveChannelID}
            ActiveUserName={ActiveUserName}
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
