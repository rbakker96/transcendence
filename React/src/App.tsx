import React, {useEffect, useState} from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Profile from "./components/users/Profile";
import LoginTwoFactor from "./components/users/LoginTwoFactor";
import UpdateUser from "./components/users/Update";
import ChatPage from "./pages/ChatPage";
import GamePage from "./components/game/GamePage";
import SpecialGame from "./components/game/SpecialGamePage";
import enableTwoFactor from "./components/users/EnableTwoFactor";
import PlayGame from "./components/game/PlayGame";
import WatchGame from "./components/game/WatchGame";
import WaitingRoom from "./components/game/WaitingRoom";
import RenderCreateChannel from "./components/chat/CreateChannel/RenderCreateChannel";
import CreateDirectMessage from "./components/chat/CreateChannel/CreateDirectChannel";
import {User} from "./models/User.model";
import API from "./API/API";

function App() {
  const [activeUser, setActiveUser] = useState<User>();

  useEffect(() => {
    const getActiveUser = async () => {
      const { data } = await API.User.getActiveUser();
      setActiveUser(data);
    };
    getActiveUser();
  }, []);

  return (
    <BrowserRouter>
      <main>
        {/*User*/}
        <Route exact path={"/"} component={Login} />
        <Route exact path={"/enableTwoFactor"} component={enableTwoFactor} />
        <Route exact path={"/twoFactor"} component={LoginTwoFactor} />
        <Route exact path={"/register"} component={Register} />
        <Route exact path={"/profile"} component={Profile} />
        <Route exact path={"/update"} component={UpdateUser} />
        {/*Chat*/}
        <Route exact path={"/chat"} component={ChatPage} />
        <Route exact path={"/createChannel"} component={RenderCreateChannel} />
        <Route exact path={"/createDirectMessage"} render={() => <CreateDirectMessage activeUser={activeUser} />} />
        {/*Game*/}
        <Route exact path={"/PlayGame"} component={PlayGame} />
        <Route exact path={"/WatchGame"} component={WatchGame} />
        <Route exact path={"/WaitingRoom"} component={WaitingRoom} />
        <Route exact path={"/game"} component={GamePage} />
        <Route exact path={"/specialGame"} component={SpecialGame} />
      </main>
    </BrowserRouter>
  );
}

export default App;
