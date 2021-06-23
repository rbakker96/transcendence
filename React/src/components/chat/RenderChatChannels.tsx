import { Divider } from "antd";

type RenderChatChannelsType = {
  setActiveId: Function;
};

const DummyData = [
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

function RenderChatChannels(props: RenderChatChannelsType) {
  function setActiveChannelId(activeChannelId: number) {
    props.setActiveId(activeChannelId);
    console.log("Clicked channelID: " + activeChannelId);
  }

  return (
    <div>
      <Divider orientation={"left"}>Chat channels</Divider>
      {DummyData.map((item) => (
        <li
          key={item.channelID}
          onClick={() => setActiveChannelId(item.channelID)}
        >
          {item.Name}
        </li>
      ))}
    </div>
  );
}

export default RenderChatChannels;
