import ChatContent from "../components/chat/ChatContent";
import 'antd/dist/antd.css';
import { Row, Col } from "antd";
import ChatSidebar from "../components/chat/ChatSidebar";
import {useState} from "react";
import API from  "../API/API"

function ChatPage() {

  const [ActiveId, setActiveId] = useState(0);

  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={4}>
          <ChatSidebar setActiveId={setActiveId}/>
        </Col>
        <Col className="gutter-row" span={20}>
          <ChatContent activeChannelId={ActiveId} />
        </Col>
      </Row>
    </div>
  );
}

export default ChatPage;
