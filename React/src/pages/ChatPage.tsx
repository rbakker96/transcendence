import ChatContent from "../components/chat/ChatContent";
import { Row, Col, Divider } from "antd";
import MessageLandingPage from "../components/message/messagelandingpage";
import { useState } from "react";

function ChatPage() {
  const [ActiveID, setActiveID] = useState(2);

  function HandleMessage() {

  }

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
