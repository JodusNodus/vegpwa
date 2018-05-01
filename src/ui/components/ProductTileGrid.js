import React from "react";
import { observer } from "mobx-react";
import { withStyles } from "material-ui/styles";
import styles from "./ProductTileGrid.styles";
import sizeMe from "react-sizeme";

import * as navigate from "../../services/navigation";
import ProductTile from "./ProductTile";

@observer
class ProductTileGrid extends React.Component {
  handleProductClick = event => {
    try {
      const ean = parseInt(event.currentTarget.getAttribute("dataean"), 10);
      navigate.toProduct(ean);
    } catch (error) {}
  };

  render() {
    const { classes, products } = this.props;

    return (
      <div className={classes.gridContainer}>
        <div className={classes.gridList}>
          {products.map(p => (
            <ProductTile key={p.ean} onClick={this.handleProductClick} {...p} />
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ProductTileGrid);
