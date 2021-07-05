import styles from "./ChatInputBar.module.css";
import TextArea from "antd/lib/input/TextArea";

type TextBarType = {
  activeChannelID: number;
};

function ChatInputBar(props: TextBarType) {
  if (props.activeChannelID) {
    return (
      <div className={styles.textBar}>
        <TextArea autoSize allowClear={true} placeholder={"Enter message..."} />
        {/*<input className={styles.textBarInput} type="text" placeholder={"Enter message..."} />*/}
        <button className={styles.textBarSend} type={"submit"}>
          Send
        </button>
      </div>
    );
  } else return <div></div>;
}

export default ChatInputBar;
