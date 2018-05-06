import React from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";
import StarRating from "../components/StarRating";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Chip from "material-ui/Chip";
import Avatar from "material-ui/Avatar";
import List, { ListItem, ListItemText } from "material-ui/List";
import StoreIcon from "@material-ui/icons/Store";
import Snackbar from "material-ui/Snackbar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";

import ProductPaperLayout from "../components/ProductPaperLayout";

import * as navigate from "../../services/navigation";
import styles from "./ProductView.styles";

@inject("favoritesStore")
@inject("productStore")
@observer
class ProductView extends React.Component {
  state = {
    ean: null,
    snackBarText: null,
    ratingDialog: {
      open: false,
      rating: 1
    }
  };

  constructor(props) {
    super(props);
    const { match, productStore } = this.props;
    const ean = parseInt(match.params.ean, 10);
    productStore.fetchProduct(ean);
    this.state.ean = ean;
  }

  componentDidMount() {}

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
      fetch(this.props.productStore.product.thumbPicture + "?cache=1", {
        mode: "no-cors"
      })
        .then(() => console.log("image cached"))
        .catch(console.error);
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

  handleRateBtn = () => {
    this.setState({ ratingDialog: { ...this.state.ratingDialog, open: true } });
  };

  handleRatingDialogClose = () => {
    this.setState({
      ratingDialog: { ...this.state.ratingDialog, open: false }
    });
  };

  handleRatingDialogChange = rating => {
    this.setState({ ratingDialog: { ...this.state.ratingDialog, rating } });
  };

  handleRatingDialogConfirm = () => {
    this.props.productStore.rateProduct(this.state.ratingDialog.rating);
    this.handleRatingDialogClose();
  };

  handleIncorrectBtn = () => {};

  render() {
    const { classes, productStore, favoritesStore } = this.props;
    const { ean, ratingDialog } = this.state;
    const isFavorite = favoritesStore.isFavorite(ean);

    const { product } = productStore;

    const imageSrc = product.coverPicture
      ? product.coverPicture + "?cache=" + (isFavorite ? 1 : 0)
      : "";

    return (
      <div className={classes.root}>
        <ProductPaperLayout
          title={productStore.displayName}
          onBack={this.handleBackBtn}
          imageSrc={imageSrc}
        >
          <Button
            variant="fab"
            color="secondary"
            aria-label="favorite"
            disabled={!product.ean}
            className={classes.favoriteBtn}
            onClick={this.handleFavoriteBtn}
          >
            {isFavorite ? <FavoriteBorderIcon /> : <FavoriteIcon />}
          </Button>

          <Typography variant="body1" className={classes.item}>
            Geplaatst door {productStore.userName} op{" "}
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
            {product.supermarkets.length < 1
              ? "Nog niet toegevoegd aan supermarkten in jouw buurt"
              : "Verkrijgbaar in jouw buurt bij"}
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
        </ProductPaperLayout>

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
              ONGEDAAN MAKEN
            </Button>
          ]}
        />

        <RateDialog
          onClose={this.handleRatingDialogClose}
          onChange={this.handleRatingDialogChange}
          onConfirm={this.handleRatingDialogConfirm}
          classes={classes}
          {...ratingDialog}
        />
      </div>
    );
  }
}

const RateDialog = ({
  open = false,
  rating = 0,
  onChange,
  onClose,
  onConfirm,
  classes
}) => (
  <Dialog onClose={onClose} open={open} aria-labelledby="rating-dialog-title">
    <DialogTitle id="rating-dialog-title">Beoordeel product</DialogTitle>
    <DialogContent>
      <StarRating
        rating={rating}
        onChange={onChange}
        className={classes.interactiveStarRating}
        size={40}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Annuleren
      </Button>
      <Button onClick={onConfirm} color="primary" autoFocus>
        Verzenden
      </Button>
    </DialogActions>
  </Dialog>
);

export default withStyles(styles)(ProductView);
