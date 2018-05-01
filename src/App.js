import React from "react";
import { observer, inject } from "mobx-react";

import { spring, AnimatedSwitch } from "react-router-transition";
import { Route } from "react-router-dom";

import SplashView from "./ui/views/SplashView";
import LoginView from "./ui/views/LoginView";
import HomeView from "./ui/views/HomeView";
import ProductView from "./ui/views/ProductView";
import CreateProductView from "./ui/views/CreateProductView";
import Snackbar from "material-ui/Snackbar";

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

const styles = {
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  }
};

@inject("connectionStore")
@observer
class ConnectionSnackBar extends React.Component {
  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={!this.props.connectionStore.onLine}
        autoHideDuration={null}
        SnackbarContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">U bent offline</span>}
      />
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <div style={styles.root}>
        <AnimatedSwitch
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          mapStyles={mapStyles}
          className="switch-wrapper"
        >
          <Route path="/signup" component={LoginView} />
          <Route path="/home" component={HomeView} />
          <Route path="/product/:ean" component={ProductView} />
          <Route path="/create" component={CreateProductView} />
          <Route path="/splash" component={SplashView} />
        </AnimatedSwitch>

        <ConnectionSnackBar />
      </div>
    );
  }
}
