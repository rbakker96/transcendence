// import styles from "./ChatSideBar.module.css";
import RenderChatChannels from "./RenderChatChannels";
import RenderDirectMessage from "./RenderDirectMessage";

function ChatSidebar(props: any) {
  return (
    <div>
      <h5>Message options</h5>
      <RenderChatChannels />
      <RenderDirectMessage />
    </div>
  );
}

export default ChatSidebar;
