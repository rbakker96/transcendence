// import styles from "./ChatSideBar.module.css";
import RenderChatChannels from "./RenderChatChannels";
import RenderDirectMessage from "./RenderDirectMessage";

type ChatSidebarType = {
  setActiveId: Function;
};

function ChatSidebar(props: ChatSidebarType) {
  return (
    <div>
      <RenderChatChannels setActiveId={props.setActiveId} />
      <RenderDirectMessage setActiveId={props.setActiveId} />
    </div>
  );
}

export default ChatSidebar;
