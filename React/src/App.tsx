import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import MessageLandingPage from "./components/message/messagelandingpage"
import Message from "./components/message/message";
import './App.css';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <main>

              <Route exact path={'/'} component={Login} />

              <Route path={'/register'} component={Register}  />

              {/*<Route path={'/profile'} component={Profile}  />*/}
			  <Route path={'/messageLandingPage'} component={MessageLandingPage}  />
              <Route path={'/messageLandingPage/message'} component={Message}/>
          </main>
        </BrowserRouter>
      </div>
  );
}

export default App;
