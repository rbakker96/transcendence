import styles from "./ChatContent.module.css";
import ChatChannelHeader from "./ChatChannelHeader";

const DUMMY_DATA = [
  {
    id: 'm1',
    title: 'This is a first meetup',
    address: 'Meetupstreet 5, 12345 Meetup City',
    description:
      'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
  },
  {
    id: 'm2',
    title: 'This is a second meetup',
    address: 'Meetupstreet 5, 12345 Meetup City',
    description:
      'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
  },
];

function ChatContent() {
  let channel_name = "qing";
  return (
    <div>
      <ChatChannelHeader name={channel_name} />
      {/*<ChannelMessages />*/}
    </div>
  );
}

export default ChatContent;
