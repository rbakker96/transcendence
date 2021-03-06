import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Profile from "./components/users/Profile";
import LoginTwoFactor from "./components/users/LoginTwoFactor";
import UpdateUser from "./components/users/Update";
import ChatPage from "./components/chat/ChatPage";
import GamePage from "./components/game/GamePage";
import SpecialGame from "./components/game/SpecialGamePage";
import enableTwoFactor from "./components/users/EnableTwoFactor";
import PlayGame from "./components/game/PlayGame";
import WatchGame from "./components/game/WatchGame";
import WaitingRoom from "./components/game/WaitingRoom";

import PublicProfile from "./components/users/PublicProfile";
import PublicProfilesOverview from "./components/users/PublicProfilesOverview";

import RenderCreateChannel from "./components/chat/CreateChannel/RenderCreateChannel";
import CreateDirectMessage from "./components/chat/CreateChannel/CreateDirectChannel";
import AdminSettings from "./components/chat/UserProfilePopup/adminSettings";
function App() {
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
        <Route exact path={'/publicProfilesOverview'} component={PublicProfilesOverview}  />
        <Route exact path={'/publicProfile'} component={PublicProfile}  />
        {/*Chat*/}
        <Route exact path={"/chat"} component={ChatPage} />
        <Route exact path={"/createChannel"} component={RenderCreateChannel} />
        <Route exact path={"/createDirectMessage"} component={CreateDirectMessage} />
        <Route exact path={"/adminSetting"} component={AdminSettings} />
        {/*Game*/}
        <Route exact path={"/PlayGame"} component={PlayGame} />
        <Route exact path={"/WatchGame"} component={WatchGame} />
        <Route exact path={"/WaitingRoom"} component={WaitingRoom} />
        <Route exact path={'/game:gameID'} component={GamePage}  />
        <Route exact path={"/specialGame:gameID"} component={SpecialGame} />
      </main>
    </BrowserRouter>
  );
}

export default App;
