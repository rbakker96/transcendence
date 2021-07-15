import RenderChatChannels from "./RenderChatChannels";
import RenderDirectMessage from "./RenderDirectMessage";
import React from "react";
import { Link } from "react-router-dom";
import { Divider } from "antd";

type ChatSidebarType = {
  setActiveId: Function;
};

function ChatSidebar(props: ChatSidebarType) {
  return (
    <div>
      <RenderChatChannels setActiveId={props.setActiveId} />
      <RenderDirectMessage setActiveId={props.setActiveId} />
      <Divider orientation={"left"} style={{ color: "#5B8FF9" }}>
        <Link to="/createChannel"> Create New Channel</Link>
      </Divider>
    </div>
  );
}

export default ChatSidebar;
