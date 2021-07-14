import { Card } from "antd";
import { UserDeleteOutlined, CloseOutlined } from "@ant-design/icons";
import { SyntheticEvent } from "react";

type UserProfilePopupType = {
  ActiveUserID: number;
  MessageUserID: number;
  UserName: string;
  Avatar: string;
  ProfileLink: string;
  handleClose: any;
};

const { Meta } = Card;

function UserProfilePopup(props: UserProfilePopupType) {
  let actions: JSX.Element[];

  if (props.ActiveUserID === props.MessageUserID) {
    actions = [<CloseOutlined onClick={props.handleClose} />];
  } else {
    actions = [
      <UserDeleteOutlined onClick={onclick} />,
      <CloseOutlined onClick={props.handleClose} />,
    ];
  }

  function onclick(e: SyntheticEvent) {
    alert("This is where to mute the user");
  }

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="userAvatar" src={props.Avatar} />}
      actions={actions}
    >
      <Meta title={props.UserName} description={props.ProfileLink} />
    </Card>
  );
}

export default UserProfilePopup;
