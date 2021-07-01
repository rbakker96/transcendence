import { Comment } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

type ChatMessageType = {
  messageID: number;
  channelID: number;
  senderID: number;
  messageContent: string;
  messageTimestamp: string;
};

type EachChatMessageProps = {
  message: ChatMessageType;
};

function EachChatMessage(props: EachChatMessageProps) {
  console.log("Entered EachChatMessage");

  const content = props.message.messageContent;
  const datetime = props.message.messageTimestamp;

  const [UserName, setUserName] = useState("");
  const [Avatar, setAvatar] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const {data} = await axios.get('http://localhost:8000/api/users/findName',
        {
          params: {
            userID: props.message.senderID,
          },
        })
      setUserName(data.username);
      setAvatar(data.avatar);
    }
      getUser();
    }
    , [props.message.senderID]);

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
