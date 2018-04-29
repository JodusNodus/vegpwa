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
import BackIcon from "@material-ui/icons/ArrowBack";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import * as navigate from "../../services/navigation";
import styles from "./ProductView.styles";

@inject("productStore")
@observer
class ProductView extends React.Component {
  state = {};

  componentDidMount() {
    const { match, productStore } = this.props;
    const ean = parseInt(match.params.ean);
    productStore.fetchProduct(ean);
  }

  handleBackBtn = () => {
    navigate.goBack();
  };

  handleFavoriteBtn = () => {};

  handleRateBtn = () => {};

  handleIncorrectBtn = () => {};

  render() {
    const { classes, productStore } = this.props;

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
            <FavoriteIcon />
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
      </div>
    );
  }
}

export default withStyles(styles)(ProductView);
