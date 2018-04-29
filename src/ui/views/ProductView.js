import React from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";
import AppBar from "../components/AppBar";
import StarRating from "../components/StarRating";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import Chip from "material-ui/Chip";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import List, { ListItem, ListItemText } from "material-ui/List";
import StoreIcon from "@material-ui/icons/Store";
import IconButton from "material-ui/IconButton";
import Snackbar from "material-ui/Snackbar";
import BackIcon from "@material-ui/icons/ArrowBack";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import * as navigate from "../../services/navigation";
import styles from "./ProductView.styles";

@inject("favoritesStore")
@inject("productStore")
@observer
class ProductView extends React.Component {
  state = {
    snackBarText: null
  };

  componentDidMount() {
    const { match, productStore } = this.props;
    const ean = parseInt(match.params.ean);
    productStore.fetchProduct(ean);
  }

  handleBackBtn = () => {
    navigate.goBack();
  };

  toggleFavorite = () => {
    const { productStore, favoritesStore } = this.props;
    if (!favoritesStore.isFavorite(productStore.product.ean)) {
      favoritesStore.add(productStore.product);
      return true;
    } else {
      favoritesStore.remove(productStore.product.ean);
      return false;
    }
  };

  handleFavoriteBtn = () => {
    if (this.toggleFavorite()) {
      this.setState({ snackBarText: "Toegevoegd aan favorieten" });
    } else {
      this.setState({ snackBarText: "Verwijderd uit favorieten" });
    }
  };

  handleUndoClick = () => {
    this.toggleFavorite();
    this.handleSnackBarClose();
  };

  handleSnackBarClose = () => {
    this.setState({ snackBarText: null });
  };

  handleRateBtn = () => {};

  handleIncorrectBtn = () => {};

  handleIncorrectBtn = () => {};

  render() {
    const { classes, productStore, favoritesStore } = this.props;

    if (!productStore.product) {
      return <div className={classes.root} />;
    }
    const { product } = productStore;

    return (
      <div className={classes.root}>
        <div className={classes.coverContainer}>
          <IconButton
            className={classes.backBtn}
            aria-label="back"
            onClick={this.handleBackBtn}
          >
            <BackIcon />
          </IconButton>
          <img
            src={product.coverPicture}
            alt={product.name}
            className={classes.coverPicture}
          />
          <div className={classes.coverOverlay} />
          <Typography variant="display1" className={classes.productTitle}>
            {productStore.displayName}
          </Typography>
        </div>
        <Paper elevation={0} className={classes.paper}>
          <Button
            variant="fab"
            color="secondary"
            aria-label="favorite"
            className={classes.favoriteBtn}
            onClick={this.handleFavoriteBtn}
          >
            {favoritesStore.isFavorite(product.ean) ? (
              <FavoriteBorderIcon />
            ) : (
              <FavoriteIcon />
            )}
          </Button>

          <Typography variant="body1" className={classes.item}>
            Geplaatst door {product.user.firstname} op{" "}
            {productStore.creationDateString}
          </Typography>

          <StarRating rating={product.rating} className={classes.item} />

          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.item}
          >
            Labels
          </Typography>
          <div className={classes.labelsContainer}>
            {product.labels.map(l => (
              <Chip
                key={l.labelid}
                label={l.name}
                className={classes.labelChip}
              />
            ))}
          </div>

          <div className={classes.btnContainer}>
            <Button
              variant="raised"
              className={classes.btn}
              onClick={this.handleRateBtn}
            >
              beoordelen
            </Button>
            <Button
              variant="raised"
              color="secondary"
              className={classes.btn}
              onClick={this.handleIncorrectBtn}
            >
              incorrect
            </Button>
          </div>

          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.item}
          >
            Verkrijgbaar in
          </Typography>

          <List>
            {product.supermarkets.map(({ placeid, name, address }) => (
              <a
                key={placeid}
                target="blank"
                className={classes.supermarketItem}
                href={`https://www.google.com/maps/search/?api=1&query=${name}&query_place_id=${placeid}`}
              >
                <ListItem>
                  <Avatar>
                    <StoreIcon />
                  </Avatar>
                  <ListItemText primary={name} secondary={address} />
                </ListItem>
              </a>
            ))}
          </List>
        </Paper>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={!!this.state.snackBarText}
          autoHideDuration={5000}
          onClose={this.handleSnackBarClose}
          SnackbarContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.snackBarText}</span>}
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={this.handleUndoClick}
            >
              UNDO
            </Button>
          ]}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ProductView);
