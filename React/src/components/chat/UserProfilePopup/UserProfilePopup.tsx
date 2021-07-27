import { Card } from "antd";
import {
  UserDeleteOutlined,
  CloseOutlined,
  LinkOutlined,
  HeartOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import React, { SyntheticEvent, useEffect, useState } from "react";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import { User } from "../../../models/User.model";
import API from "../../../API/API";

type UserProfilePopupType = {
  ActiveUserID: number;
  MessageUserID: number;
  UserName: string;
  Avatar: string;
  ProfileLink: string;
  handleClose: any;
  activeChannelId: number;
};

const { Meta } = Card;

function UserProfilePopup(props: UserProfilePopupType) {
  const [usersData, setUsersData] = useState<User>();
  const [privateGame, setprivateGame] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    let mounted = true;

    const authorization = async () => {
      try { await axios.get('userData'); }
      catch(err){
        if(mounted)
          setUnauthorized(true);
      }
    }
    authorization();
    return () => {mounted = false;}
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.post("publicUserData", {
        id: props.MessageUserID,
      });
      setUsersData(data);
    };
    getUser();
  }, [props.MessageUserID]);

  function onclick(e: SyntheticEvent) {
    e.preventDefault();
    API.Channels.changeState(3, props.activeChannelId, props.MessageUserID);
  }

  async function handleLikeFriend(e: SyntheticEvent) {
    e.preventDefault();
    const ret = await axios.post("users/saveFriendToUser", {
      userID: props.ActiveUserID,
      friendID: props.MessageUserID,
    });
    if (ret.status === 201) alert("You've added the user as friend");
    else console.log("Error when adding friend");
  }

  async function sendGameInvite(e: SyntheticEvent, id: number) {
    e.preventDefault();

    try {
      const ret = await axios.put('sendGameInvite', {id});
      console.log(ret);
      setprivateGame(true);
      console.log("HELLO");
    }
    catch (err) { }
  }

  let actions: JSX.Element[];
  if (props.ActiveUserID === props.MessageUserID) {
    actions = [
      <Link to={{ pathname: "/publicProfile", state: { usersData } }}>
        <LinkOutlined />
      </Link>,
      <CloseOutlined onClick={props.handleClose} />,
    ];
  } else {
    actions = [
      <Link to={{ pathname: "/publicProfile", state: { usersData } }}>
        <LinkOutlined />
      </Link>,
      <PlayCircleOutlined onClick={(e) => {sendGameInvite(e, props.MessageUserID)}}/>,
      <HeartOutlined onClick={handleLikeFriend} />,
      <UserDeleteOutlined onClick={onclick} />,
      <CloseOutlined onClick={props.handleClose} />,
    ];
  }

  if (unauthorized)
    return <Redirect to={'/'}/>;

  if (privateGame)
  {
    console.log("private redirect");
    return <Redirect to={{pathname:"/WaitingRoom", state: "private"}}/>;
  }

  if (!privateGame)
    console.log("not private");

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="userAvatar" src={props.Avatar} />}
      actions={actions}
    >
      <Meta title={props.UserName} />
    </Card>
  );
}

export default UserProfilePopup;
