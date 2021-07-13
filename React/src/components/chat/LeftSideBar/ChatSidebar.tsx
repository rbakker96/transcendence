// import styles from "./ChatSideBar.module.css";
import RenderChatChannels from "./RenderChatChannels";
import RenderDirectMessage from "./RenderDirectMessage";
import React from "react";
import { Link } from "react-router-dom";

type ChatSidebarType ={
  setActiveId: Function;
}

function ChatSidebar(props: ChatSidebarType) {
  return (
    <div>
        <RenderChatChannels setActiveId={props.setActiveId}/>
        <RenderDirectMessage setActiveId={props.setActiveId}/>
        <Link to='/createChannel'> Create New Channel</Link>
    </div>
  );
}

export default ChatSidebar;
