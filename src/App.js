import React from "react";

import { spring, AnimatedSwitch } from "react-router-transition";
import { Route } from "react-router-dom";

import SplashView from "./ui/views/SplashView";
import LoginView from "./ui/views/LoginView";
import HomeView from "./ui/views/HomeView";
import ProductView from "./ui/views/ProductView";
import CreateProductView from "./ui/views/CreateProductView";

function mapStyles(styles) {
  return {
    opacity: styles.opacity
  };
}

const bounce = val =>
  spring(val, {
    stiffness: 300,
    damping: 30
  });

const bounceTransition = {
  atEnter: {
    opacity: 0
  },
  atLeave: {
    opacity: bounce(0)
  },
  atActive: {
    opacity: bounce(1)
  }
};

export default () => (
  <AnimatedSwitch
    atEnter={bounceTransition.atEnter}
    atLeave={bounceTransition.atLeave}
    atActive={bounceTransition.atActive}
    mapStyles={mapStyles}
    className="switch-wrapper"
  >
    <Route path="/splash" component={SplashView} />
    <Route path="/signup" component={LoginView} />
    <Route path="/home" component={HomeView} />
    <Route path="/product/:ean" component={ProductView} />
    <Route path="/create" component={CreateProductView} />
  </AnimatedSwitch>
);
