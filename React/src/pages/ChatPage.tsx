import ChatContent from "../components/chat/ChatContent";
import { Row, Col, Divider } from "antd";
import MessageLandingPage from "../components/message/messagelandingpage";
import { useState } from "react";
import API from  "../API/API"

function ChatPage() {
  const [ActiveID, setActiveID] = useState(2);

  // API.Channels(); // here we do all the calls for information we need;
  return (
    <div>
      <Row gutter={24}>
        <Col className="gutter-row" span={10}>
          <MessageLandingPage setActiveId={setActiveID}/>
        </Col>
        <Col className="gutter-row" span={14}>
          <ChatContent activeChannelId={ActiveID} /> // this should be variabel
        </Col>
      </Row>
    </div>
  );
}

export default ChatPage;
