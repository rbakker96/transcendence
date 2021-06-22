import { Comment } from "antd";

type EachChatMessageProps = {
  userId: number;
  userName: string;
  userAvatar: string;
  messageTimeStamp: string;
  messageContent: string;
  channelName: string;
};

function EachChatMessage(props: EachChatMessageProps) {
  console.log("Entered EachChatMessage");

  return (
    <div>
        <Comment
          content={props.messageContent}
          author={props.userName}
          avatar={props.userAvatar}
          datetime={props.messageTimeStamp}
        />
    </div>
  );
}

export default EachChatMessage;
