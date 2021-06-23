// import styles from "./ChatSideBar.module.css";

import { Divider } from "antd";

const DummyDirectMessage = [
  {
    channelID: 1,
    Name: "Epic first channel",
    admin: "thimo", // this is going to become a UserID in the future
    participants: ["Thimo", "Roy", "Gijs", "Qing"],
  },
  {
    channelID: 2,
    Name: "Epic second channel",
    admin: "Gijs", // this is going to become a UserID in the future
    participants: ["Thimo", "Roy", "Gijs", "Qing"],
  },
  {
    channelID: 3,
    Name: "Epic third channel",
    admin: "Gijs", // this is going to become a UserID in the future
    participants: ["Thimo", "Roy", "Gijs", "Qing"],
  },
  {
    channelID: 4,
    Name: "Epic fourth channel",
    admin: "Gijs", // this is going to become a UserID in the future
    participants: ["Thimo", "Roy", "Gijs", "Qing"],
  },
  {
    channelID: 5,
    Name: "Epic fifth channel",
    admin: "Gijs", // this is going to become a UserID in the future
    participants: ["Thimo", "Roy", "Gijs", "Qing"],
  },
  {
    channelID: 6,
    Name: "Zieke channel ouwe",
    admin: "Gijs", // this is going to become a UserID in the future
    participants: ["Thimo", "Roy", "Gijs", "Qing"],
  },
];

function RenderDirectMessage(props: any) {
  function GoToMessage(ChannelNumber: number, event: any, props: any) {
    // props.setActiveID(ChannelNumber);
    console.log("Clicked channelID: " + ChannelNumber);
  }

  return (
    <div>
      <Divider orientation={"left"}>Direct Messages</Divider>
      {DummyDirectMessage.map((item) => (
        <ul
          key={item.channelID}
          onClick={(e) => GoToMessage(item.channelID, e, props)}
        >
          {item.participants.map((participant) => (
            <li key={participant}>{participant}</li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default RenderDirectMessage;
