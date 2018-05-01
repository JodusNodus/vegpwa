import React from "react";
import { withStyles } from "material-ui/styles";
import styles from "./ProductTileGrid.styles";
import sizeMe from "react-sizeme";

const GridListContainer = sizeMe({
  monitorHeight: true,
  monitorWidth: false,
  refreshRate: 1000,
  refreshMode: "debounce"
})(props => (
  <div className={props.className}>
    <div style={{ height: props.size.height, overflow: "auto" }}>
      {props.children}
    </div>
  </div>
));

class ProductTileGrid extends React.Component {
  render() {
    const { classes, children } = this.props;

    return (
      <GridListContainer className={classes.gridContainer}>
        <div className={classes.gridList}>{children}</div>
      </GridListContainer>
    );
  }
}

export default withStyles(styles)(ProductTileGrid);
