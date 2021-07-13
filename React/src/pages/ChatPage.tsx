import { useState } from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import ChatContent from "../components/chat/ChatContent/ChatContent";
import ChatSidebar from "../components/chat/LeftSideBar/ChatSidebar";

function ChatPage() {
  const [ActiveId, setActiveId] = useState(0);

  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={4}>
          <ChatSidebar setActiveId={setActiveId} />
        </Col>
        <Col className="gutter-row" span={20}>
          <ChatContent activeChannelID={ActiveId} />
        </Col>
      </Row>
    </div>
  );
}

export default ChatPage;
