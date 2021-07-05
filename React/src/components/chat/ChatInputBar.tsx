import styles from "./ChatInputBar.module.css";
import { useState } from "react";
// import TextArea from "antd/lib/input/TextArea";

type TextBarType = {
  activeChannelID: number;
};

function ChatInputBar(props: TextBarType) {
  const [inputValue, setInputValue] = useState("");

  function submitHandler() {
    console.log("submitted value: " + inputValue);
  }

  function changeHandler(event: any) {
    setInputValue(event.target.value);
  }

  if (props.activeChannelID) {
    return (
      <div className={styles.textBar}>
        {/*<TextArea autoSize allowClear={true} placeholder={"Enter message..."} />*/}
        <input
          className={styles.textBarInput}
          type="text"
          placeholder={"Enter message..."}
          onChange={changeHandler}
        />
        <button
          className={styles.textBarSend}
          type={"submit"}
          onClick={submitHandler}
        >
          Send
        </button>
      </div>
    );
  } else return <div></div>;
}

export default ChatInputBar;
