import { Comment } from "antd";
import { useEffect, useState } from "react";
import API from "../../../API/API";

type ChatMessageType = {
  // messageID: number;
  channelID: number;
  senderID: number;
  messageContent: string;
  messageTimestamp: string;
};

type EachChatMessageProps = {
  message: ChatMessageType;
};

function EachChatMessage(props: EachChatMessageProps) {
  const content = props.message.messageContent;
  const datetime = props.message.messageTimestamp;

  const [UserName, setUserName] = useState("");
  const [Avatar, setAvatar] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await API.User.findName(props.message.senderID);
      setUserName(data.username);
      setAvatar(data.avatar);
    };
    getUser();
  }, [props, setUserName, setAvatar]);

  return (
    <div>
      <Comment
        content={content}
        author={UserName}
        avatar={Avatar}
        datetime={datetime}
      />
    </div>
  );
}

export default EachChatMessage;
