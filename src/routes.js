import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/home/Home";
import Current from "./Components/profiles/CurrentUserProfile";
import Login from "./Components/login/Login";
import Register from "./Components/register/Register";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/current" component={Current} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Switch>
);
