import React from "react";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import IconButton from "material-ui/IconButton";
import BackIcon from "@material-ui/icons/ArrowBack";
import Typography from "material-ui/Typography";
import MediaQuery from "react-responsive";

import styles from "./ProductPaperLayout.styles";

class ProductPaperLayout extends React.Component {
  render() {
    const { imageSrc, title, onBack, children, classes, ref } = this.props;

    return (
      <div className={classes.container} ref={ref}>
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
          {imageSrc && (
            <img
              src={imageSrc}
              alt="product"
              className={classes.coverPicture}
            />
          )}
          <div className={classes.coverOverlay} />
        </div>
        <MediaQuery query="(min-height: 400px)">
          {fullHeight => (
            <Paper
              elevation={4}
              className={
                classes.paper +
                " " +
                (!fullHeight ? classes.keyboardOpenPaper : "")
              }
            >
              <Typography variant="display1" className={classes.productTitle}>
                {title}
              </Typography>

              {children}
            </Paper>
          )}
        </MediaQuery>
      </div>
    );
  }
}

export default withStyles(styles)(ProductPaperLayout);
