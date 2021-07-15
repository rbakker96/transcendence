import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import ChatContent from "../components/chat/ChatContent/ChatContent";
import ChatSidebar from "../components/chat/LeftSideBar/ChatSidebar";
import CurrentUserBar from "../components/chat/CurrentUserBar/CurrentUserBar";
import API from "../API/API";

function ChatPage() {
  const [ActiveChannelID, setActiveChannelID] = useState(0);
  const [ActiveUserID, setActiveUserID] = useState<number>(0);
  const [UserName, setUserName] = useState("");
  const [Avatar, setAvatar] = useState("");

  // Potentially best to get activeUser in the main page already -> should only have one call to check activeUser
  useEffect(() => {
    const setActiveID = async () => {
      const { data } = await API.User.getActiveUser();
      setActiveUserID(data.activeUserID);
    };
    setActiveID();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await API.User.findName(ActiveUserID);
      setUserName(data.username);
      setAvatar(data.avatar);
    };
    getUser();
  }, [ActiveUserID]);

  return (
    <div>
      <CurrentUserBar Avatar={Avatar} UserName={UserName} />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={4}>
          <ChatSidebar setActiveId={setActiveChannelID} />
        </Col>
        <Col className="gutter-row" span={20}>
          <ChatContent
            activeChannelID={ActiveChannelID}
            setActiveChannelID={setActiveChannelID}
          />
        </Col>
      </Row>
    </div>
  );
}

export default ChatPage;
