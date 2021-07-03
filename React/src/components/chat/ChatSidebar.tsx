// import styles from "./ChatSideBar.module.css";
import RenderChatChannels from "./RenderChatChannels";
import RenderDirectMessage from "./RenderDirectMessage";
import RenderCreateChannel from "./CreateChannel/RenderCreateChannel";

type ChatSidebarType ={
  setActiveId: Function;
}

function ChatSidebar(props: ChatSidebarType) {
  return (
    <div>
        <RenderChatChannels setActiveId={props.setActiveId}/>
        <RenderDirectMessage setActiveId={props.setActiveId}/>
        <RenderCreateChannel />

    </div>
  );
}

export default ChatSidebar;
