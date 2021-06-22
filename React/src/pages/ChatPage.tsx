import ChatContent from "../components/chat/ChatContent";
import { Row, Col, Divider } from "antd";

function ChatPage() {
  return (
    <div>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <p>PLACEHOLDER[SIDE BAR]</p>
        </Col>
        <Col className="gutter-row" span={18}>
          <ChatContent activeChannelId={1} />
        </Col>
      </Row>
    </div>
  );
}

export default ChatPage;
