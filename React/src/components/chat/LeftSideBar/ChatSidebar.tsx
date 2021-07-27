import RenderChatChannels from "./RenderChatChannels";
import RenderDirectMessage from "./RenderDirectMessage";
import React from "react";
import { Link } from "react-router-dom";
import { Divider } from "antd";
import './ChatSidebar.css'

type ChatSidebarType = {
  setActiveId: Function;
  ActiveUserName: string;
  ActiveUserId : number;
  ActiveChannelId : number;
};

function ChatSidebar(props: ChatSidebarType) {

  return (
    <div className="chatsidebar">
      <RenderChatChannels
          setActiveId={props.setActiveId}
          ActiveUserId={props.ActiveUserId}
      />
      <RenderDirectMessage
        setActiveChannelId={props.setActiveId}
        ActiveUserName={props.ActiveUserName}
        ActiveUserId={props.ActiveUserId}
        ActiveChannelID={props.ActiveChannelId}
      />
      <Divider orientation={"left"} style={{ color: "#5B8FF9" }}>
        <Link to="/createChannel">Create New Channel</Link>
      </Divider>
      <Divider orientation={"left"} style={{ color: "#5B8FF9" }}>
        <Link to="/createDirectMessage">Create Direct Message</Link>
      </Divider>
    </div>
  );
}

export default ChatSidebar;
