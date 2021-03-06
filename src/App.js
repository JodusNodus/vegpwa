import React from "react";
import { observer, inject } from "mobx-react";

import { MuiThemeProvider } from "material-ui/styles";
import { spring, AnimatedSwitch } from "react-router-transition";
import { Route } from "react-router-dom";

import LoginView from "./ui/views/LoginView";
import HomeView from "./ui/views/HomeView";
import ProductView from "./ui/views/ProductView";
import CreateProductView from "./ui/views/CreateProductView";
import FavoritesView from "./ui/views/FavoritesView";
import SearchView from "./ui/views/SearchView";

import theme from "./ui/theme";

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
        <MuiThemeProvider theme={theme}>
          <AnimatedSwitch
            atEnter={bounceTransition.atEnter}
            atLeave={bounceTransition.atLeave}
            atActive={bounceTransition.atActive}
            mapStyles={mapStyles}
            className="switch-wrapper"
          >
            <Route path="/login" component={LoginView} />
            <Route path="/home" component={HomeView} />
            <Route path="/product/:ean" component={ProductView} />
            <Route path="/create" component={CreateProductView} />
            <Route path="/favorites" component={FavoritesView} />
            <Route path="/search" component={SearchView} />
          </AnimatedSwitch>

          <ConnectionSnackBar />
        </MuiThemeProvider>
      </div>
    );
  }
}
