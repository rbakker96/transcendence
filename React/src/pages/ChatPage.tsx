import ChatContent from "../components/chat/ChatContent";
import { Row, Col } from "antd";

function ChatPage() {
  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={4}>
          <p>PLACEHOLDER[SIDE BAR]</p>
        </Col>
        <Col className="gutter-row" span={20}>
          <ChatContent activeChannelId={1} />
        </Col>
      </Row>
    </div>
  );
}

export default ChatPage;
