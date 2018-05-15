import React from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";
import AppBar from "../components/AppBar";
import IconButton from "material-ui/IconButton";
import BackIcon from "@material-ui/icons/ArrowBack";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";

import ProductTileGrid from "../components/ProductTileGrid";

import * as navigate from "../../services/navigation";
import styles from "./FavoritesView.styles";

@inject("connectionStore")
@inject("favoritesStore")
@observer
class FavoritesView extends React.Component {
  handleCreateProductClick = event => {
    navigate.toCreateProduct();
  };

  render() {
    const { classes, favoritesStore, connectionStore } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          title="Favorites"
          leftButton={
            connectionStore.onLine && (
              <IconButton aria-label="back" onClick={navigate.goBack}>
                <BackIcon style={{ color: "white" }} />
              </IconButton>
            )
          }
        />

        {favoritesStore.products.length < 1 ? (
          <Paper elevation={4} className={classes.paper}>
            <Typography variant="title">
              Je hebt nog geen favorieten toegevoegd.
            </Typography>
          </Paper>
        ) : (
          <ProductTileGrid products={favoritesStore.products} favorites />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(FavoritesView);
