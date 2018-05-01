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
        isDone: props => props.createProductStore.ean != -1,
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
    this.props.createProductStore.fetchSupermarkets();
    this.props.createProductStore.fetchFormData();
  }

  handleNext = () => {
    const activeStep = this.state.activeStep + 1;

    if (activeStep > this.state.steps) {
      // done
    } else {
      if (this.handleRouteNext()) {
        this.setState({ activeStep });
        navigate.toCreateProduct(activeStep + 1);
      }
    }
  };

  handleBack = () => {
    const activeStep = this.state.activeStep - 1;
    this.setState({ activeStep });
    navigate.toCreateProduct(activeStep + 1);
  };

  handleNextSet = handleNext => {
    this.handleRouteNext = handleNext;
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep, steps } = this.state;

    return (
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.header}>
          <Typography>
            Stap {activeStep + 1} van {steps.length}: {steps[activeStep].label}
          </Typography>
        </Paper>
        <div className={classes.screenContainer}>
          <Switch>
            {steps.map(({ Component }, i) => (
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
              Volgende
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
              Terug
            </Button>
          }
        />
      </div>
    );
  }
}

export default withStyles(styles)(CreateProductView);
