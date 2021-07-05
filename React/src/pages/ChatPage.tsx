import { useState } from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import ChatContent from "../components/chat/ChatContent";
import ChatSidebar from "../components/chat/ChatSidebar";

function ChatPage() {
  const [ActiveId, setActiveId] = useState(0);

  // const socket = new WebSocket("ws://localhost:8000");
  //
  // socket.onopen = function (e) {
  //   console.log("[open] Connection established");
  //   socket.send("My name is John");
  // };
  //
  // socket.onmessage = function (event) {
  //   console.log(event.data);
  // };

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
