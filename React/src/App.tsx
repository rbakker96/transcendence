import React from "react";
import { Route } from "react-router-dom";
// import Register from "./components/users/Register";
// import Login from "./components/users/Login";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div>
      <main>
        {/*<Route exact path={"/"}>*/}
        {/*  <Login />*/}
        {/*</Route>*/}
        {/*<Route path={"/register"}>*/}
        {/*  <Register />*/}
        {/*</Route>*/}
        <Route path={"/chat-content"}>
          <ChatPage />
        </Route>
      </main>
    </div>
  );
}

export default App;
