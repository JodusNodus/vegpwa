import React from "react";
import { withStyles } from "material-ui/styles";

import { GridListTileBar } from "material-ui/GridList";

import styles from "./ProductTile.styles";

const ProductTile = ({ ean, name, brand, onClick, classes }) => (
  <div className={classes.root} dataean={ean} onClick={onClick} role="button">
    <div className={classes.aspectRatio}>
      <div className={classes.tile}>
        <img
          className={classes.img}
          src={"https://storage.googleapis.com/vegstorage/thumb-" + ean}
          alt={name}
        />
        <GridListTileBar title={brand.name + " " + name} />
      </div>
    </div>
  </div>
);

export default withStyles(styles)(ProductTile);
