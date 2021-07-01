import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Profile from "./components/users/Profile";
import './App.css';
import TwoFactor from "./components/users/TwoFactor";
import UpdateUser from "./components/users/Update";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
        <BrowserRouter>
          <main>

              <Route exact path={'/'} component={Login} />

              <Route exact path={'/twoFactor'} component={TwoFactor}  />

              <Route exact path={'/register'} component={Register}  />

              <Route exact path={'/profile'} component={Profile}  />

              <Route exact path={'/update'} component={UpdateUser}  />

              <Route exact path={"/chat"}><ChatPage /></Route>

          </main>
        </BrowserRouter>
  );
}

export default App;
