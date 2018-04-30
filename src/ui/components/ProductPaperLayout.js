import React from "react";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import IconButton from "material-ui/IconButton";
import BackIcon from "@material-ui/icons/ArrowBack";
import Typography from "material-ui/Typography";

import * as navigate from "../../services/navigation";
import styles from "./ProductPaperLayout.styles";

class ProductPaperLayout extends React.Component {
  render() {
    const { imageSrc, title, onBack, children, classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.coverContainer}>
          {onBack ? (
            <IconButton
              className={classes.backBtn}
              aria-label="back"
              onClick={onBack}
            >
              <BackIcon />
            </IconButton>
          ) : (
            undefined
          )}
          <img
            src={imageSrc}
            alt="product image"
            className={classes.coverPicture}
          />
          <div className={classes.coverOverlay} />
        </div>
        <Paper elevation={4} className={classes.paper}>
          <Typography variant="display1" className={classes.productTitle}>
            {title}
          </Typography>

          {children}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ProductPaperLayout);
