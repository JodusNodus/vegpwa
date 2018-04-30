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
import ProductPictureView from "./ProductPictureView";
import LoginView from "./LoginView";

import * as navigate from "../../services/navigation";
import styles from "./CreateProductView.styles";

@inject("createProductStore")
@observer
class CreateProductView extends React.Component {
  state = {
    activeStep: 0,
    steps: [
      {
        label: "Barcode invoeren",
        isDone: props => props.createProductStore.ean != -1,
        component: BarcodeScannerView
      },
      {
        label: "Foto maken",
        isDone: props =>
          props.createProductStore.originalPictureData.length > 0,
        component: ProductPictureView
      },
      {
        label: "Informatie invullen",
        isDone: () => true,
        component: LoginView
      }
    ]
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
            Step {activeStep + 1} of {steps.length}: {steps[activeStep].label}
          </Typography>
        </Paper>
        <div className={classes.screenContainer}>
          <Switch>
            {steps.map((s, i) => (
              <Route
                key={i}
                path={`/create/${i + 1}`}
                component={s.component}
              />
            ))}
          </Switch>
        </div>
        <MobileStepper
          variant="text"
          steps={steps.length}
          position="static"
          activeStep={activeStep}
          className={classes.stepper}
          nextButton={
            <Button
              size="small"
              onClick={this.handleNext}
              disabled={
                activeStep >= steps.length ||
                !steps[activeStep].isDone(this.props)
              }
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={this.handleBack}
              disabled={activeStep === 0}
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
