import { Card } from "antd";
import { UserDeleteOutlined, CloseOutlined, LinkOutlined } from "@ant-design/icons";
import React, {SyntheticEvent, useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import {User} from "../../../models/User.model";
import API from "../../../API/API";

type UserProfilePopupType = {
  ActiveUserID: number;
  MessageUserID: number;
  UserName: string;
  Avatar: string;
  ProfileLink: string;
  handleClose: any;
  setIDIsMuted: Function;
  activeChannel: number;
};

const { Meta } = Card;

function UserProfilePopup(props: UserProfilePopupType) {

  const [usersData, setUsersData] = useState<User>();

  useEffect(() => {
    const getUser = async () => {
      const {data} = await axios.post('publicUserData', {id: props.MessageUserID});
      setUsersData(data);
    }
    getUser();
  }, [props.MessageUserID]);

  function onclick(e: SyntheticEvent) {
    e.preventDefault();
    API.Channels.changeState(3, props.activeChannel, props.ActiveUserID);
    props.setIDIsMuted((prevState: number[]) => [
      ...prevState,
      props.MessageUserID,
    ]);
  }

  let actions: JSX.Element[];
  if (props.ActiveUserID === props.MessageUserID) {
    actions = [
      <Link to={{pathname:"/publicProfile", state: {usersData}}}><LinkOutlined/></Link>,
      <CloseOutlined onClick={props.handleClose} />
    ];
  } else {
    actions = [
      <Link to={{pathname:"/publicProfile", state: {usersData}}}><LinkOutlined/></Link>,
      <UserDeleteOutlined onClick={onclick} />,
      <CloseOutlined onClick={props.handleClose} />,
    ];
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
