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
      <img src={props.userAvatar} alt={props.userName} />
      <p>{props.messageContent}</p>
      <p>{props.messageTimeStamp}</p>
    </div>
  );
}

export default EachChatMessage;
