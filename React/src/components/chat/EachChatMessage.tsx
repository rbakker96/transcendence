import { Comment, Badge } from "antd";

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
      <Badge count={4}>
        <Comment
          content={props.messageContent}
          author={props.userName}
          avatar={props.userAvatar}
          datetime={props.messageTimeStamp}
        />
      </Badge>
    </div>
  );
}

export default EachChatMessage;
