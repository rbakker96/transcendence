import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Profile from "./components/users/Profile";
import './App.css';

function App() {
  return (
        <BrowserRouter>
          <main>

              <Route exact path={'/'} component={Login} />

              <Route exact path={'/register'} component={Register}  />

              {/*<Route exact path={'/profile'} component={Profile}  />*/}

          </main>
        </BrowserRouter>
  );
}

export default App;
