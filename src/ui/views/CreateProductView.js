import React from "react";

import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";

import { Switch, Route, Redirect } from "react-router-dom";
import MobileStepper from "material-ui/MobileStepper";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import BarcodeScannerView from "./BarcodeScannerView";
import SplashView from "./SplashView";
import LoginView from "./LoginView";
import HomeView from "./HomeView";
import ProductView from "./ProductView";

import * as navigate from "../../services/navigation";
import styles from "./CreateProductView.styles";

class CreateProductView extends React.Component {
  state = {
    activeStep: 0,
    steps: ["barcode inscannen", "login", "home"]
  };

  handleNext = () => {
    const activeStep = this.state.activeStep + 1;

    if (activeStep > this.state.steps) {
      // done
    } else {
      this.setState({ activeStep });
      navigate.toCreateProduct(activeStep + 1);
    }
  };

  handleBack = () => {
    const activeStep = this.state.activeStep - 1;
    this.setState({ activeStep });
    navigate.toCreateProduct(activeStep + 1);
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep, steps } = this.state;
    return (
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.header}>
          <Typography>
            Step {activeStep + 1} of {steps.length}: {steps[activeStep]}
          </Typography>
        </Paper>
        <div className={classes.screenContainer}>
          <Switch>
            <Route path="/create/1" component={BarcodeScannerView} />
            <Route path="/create/2" component={LoginView} />
            <Route path="/create/4" component={HomeView} />
          </Switch>
        </div>
        <MobileStepper
          variant="text"
          steps={steps.length}
          position="static"
          activeStep={this.state.activeStep}
          className={classes.stepper}
          nextButton={
            <Button
              size="small"
              onClick={this.handleNext}
              disabled={this.state.activeStep >= steps.length}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={this.handleBack}
              disabled={this.state.activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </div>
    );
  }
}

export default withStyles(styles)(CreateProductView);
