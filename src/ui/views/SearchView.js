import React from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import BackIcon from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";
import { STATE } from "../../constants";

import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import ProductTileGrid from "../components/ProductTileGrid";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";

import SplashView from "./SplashView";

import * as navigate from "../../services/navigation";
import styles from "./SearchView.styles";

@inject("searchStore")
@observer
class FavoritesView extends React.Component {
  state = {
    query: ""
  };

  handleChange = evt => {
    this.setState({ query: evt.target.value });
  };

  handleKeyPress = evt => {
    if (evt.key === "Enter") {
      this.handleSearchClick();
    }
  };

  handleSearchClick = () => {
    this.props.searchStore.fetchProducts(this.state.query);
  };

  render() {
    const { classes, searchStore } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton aria-label="back" onClick={navigate.goBack}>
              <BackIcon style={{ color: "white" }} />
            </IconButton>

            <Paper elevation={0} className={classes.searchPaper}>
              <TextField
                autoFocus
                placeholder="Zoeken"
                className={classes.input}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                value={this.state.query}
                fullWidth
              />
            </Paper>

            <IconButton aria-label="back" onClick={this.handleSearchClick}>
              <SearchIcon style={{ color: "white" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        {searchStore.searchState === STATE.pending ? (
          <SplashView text="Searching" />
        ) : (
          <ProductTileGrid products={searchStore.products} favorites />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(FavoritesView);
