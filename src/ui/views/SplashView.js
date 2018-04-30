import React from "react";
import { CircularProgress } from "material-ui/Progress";
import { withStyles } from "material-ui/styles";

const styles = {
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
};

class SplashView extends React.Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <CircularProgress size={80} />;
      </div>
    );
  }
}

export default withStyles(styles)(SplashView);
