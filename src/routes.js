import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/home/Home";
import Current from "./Components/profiles/CurrentUserProfile";
import Match from "./Components/profiles/MatchedUserProfile";
import Login from "./Components/login/Login";
import Register from "./Components/register/Register";
import About from "./Components/register/About";
import About2 from "./Components/register/About2";
import Preferences from "./Components/register/Preferences";
import Inbox from "./Components/inbox/inbox";
import ChatDisplay from "./Components/chatDisplay/ChatDisplay";



export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/current" component={Current} />
    <Route path="/match" component={Match} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/about" component={About} />
    <Route path="/about2" component={About2} />
    <Route path="/preferences" component={Preferences} />
    <Route path="/inbox/" component={Inbox} />
    <Route path="/chat/:user_id" component={ChatDisplay} />
    <Route path="/preferences" component={Preferences} />
  </Switch>
);
