import React from "react";

import { Switch, Route } from "react-router-dom";

import SplashView from "./ui/views/SplashView";
import LoginView from "./ui/views/LoginView";
import HomeView from "./ui/views/HomeView";

export default () => (
  <Switch>
    <Route path="/splash" component={SplashView} />
    <Route path="/signup" component={LoginView} />
    <Route path="/home" component={HomeView} />
  </Switch>
);
