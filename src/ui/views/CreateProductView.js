import React from "react";

import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";

import { Switch, Route } from "react-router-dom";
import MobileStepper from "material-ui/MobileStepper";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import MediaQuery from "react-responsive";

import BarcodeScannerView from "./BarcodeScannerView";
import ProductPictureView from "./ProductPictureView";
import ProductFormView from "./ProductFormView";
import SupermarketPickerView from "./SupermarketPickerView";
import LabelPickerView from "./LabelPickerView";

import * as navigate from "../../services/navigation";
import styles from "./CreateProductView.styles";

@inject("createProductStore")
@observer
class CreateProductView extends React.Component {
  state = {
    activeStep: 0,
    steps: [
      {
        label: "Voer de barcode in",
        isDone: props => props.createProductStore.ean !== -1,
        Component: BarcodeScannerView
      },
      {
        label: "Selecteer de supermarkt van afkomst",
        isDone: props => props.createProductStore.placeid,
        Component: SupermarketPickerView
      },
      {
        label: "Maak een product foto",
        isDone: props => props.createProductStore.pictureTaken,
        Component: ProductPictureView
      },
      {
        label: "Vul naam en merk in",
        isDone: props => props.createProductStore.isFormComplete(),
        Component: ProductFormView
      },
      {
        label: "Voeg labels toe",
        isDone: props => props.createProductStore.productLabels.length > 0,
        Component: LabelPickerView
      }
    ]
  };

  componentDidMount() {
    this.block();

    this.props.createProductStore.fetchSupermarkets();
    this.props.createProductStore.fetchFormData();
  }

  block = () => {
    this.blocker = navigate.history.block(
      "Ben je zeker dat je wilt stoppen met het toevoegen van een product?"
    );
  };

  unblock = () => {
    if (this.blocker) {
      this.blocker();
    }
  };

  componentWillUnmount() {
    this.unblock();
  }

  getSteps = () => {
    const { createProductStore } = this.props;
    let { steps } = this.state;
    if (createProductStore.alreadyExists) {
      steps = steps.slice(0, 2);
    }
    return steps;
  };

  handleNext = () => {
    this.unblock();
    const activeStep = this.state.activeStep + 1;

    if (activeStep >= this.getSteps().length) {
      this.props.createProductStore.createProduct();
      return;
    }
    if (this.handleRouteNext()) {
      this.showBars();
      this.setState({ activeStep });
      navigate.toCreateProduct(activeStep + 1);
    }
    this.block();
  };

  handleBack = () => {
    const activeStep = this.state.activeStep - 1;
    if (activeStep < 0) {
      navigate.toHome();
      this.props.createProductStore.clear();
    } else {
      this.showBars();
      this.unblock();
      this.setState({ activeStep });
      navigate.toCreateProduct(activeStep + 1);
      this.block();
    }
  };

  handleNextSet = handleNext => {
    this.handleRouteNext = handleNext;
  };

  render() {
    const { classes, createProductStore } = this.props;
    let { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <MediaQuery query="(min-height: 400px)">
          <Paper square elevation={0} className={classes.header}>
            <Typography>
              Stap {activeStep + 1} van {this.getSteps().length}:{" "}
              {this.getSteps()[activeStep].label}
            </Typography>
          </Paper>
        </MediaQuery>
        <div className={classes.screenContainer}>
          <Switch>
            {this.getSteps().map(({ Component }, i) => (
              <Route
                key={i}
                path={`/create/${i + 1}`}
                render={props => (
                  <Component onNext={this.handleNextSet} {...props} />
                )}
              />
            ))}
          </Switch>
        </div>
        <MobileStepper
          variant="text"
          steps={this.getSteps().length}
          position="static"
          activeStep={activeStep}
          className={classes.stepper}
          nextButton={
            <Button
              size="small"
              onClick={this.handleNext}
              disabled={!this.getSteps()[activeStep].isDone(this.props)}
            >
              Volgende
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack}>
              <KeyboardArrowLeft />
              Terug
            </Button>
          }
        />
      </div>
    );
  }
}

export default withStyles(styles)(CreateProductView);
