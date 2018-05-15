import React from "react";
import { CircularProgress } from "material-ui/Progress";
import Typography from "material-ui/Typography";
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
    const { text } = this.props;
    return (
      <div className={this.props.classes.root}>
        <CircularProgress size={80} />
        {!!text && <Typography variant="title">{text}</Typography>}
      </div>
    );
  }
}

export default withStyles(styles)(SplashView);
