import React from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import NumberFormat from "react-number-format";
import Paper from "material-ui/Paper";

import styles from "./BarcodeScannerView.styles";

import ean13Image from "../resources/ean13.svg";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      size={15}
      onValueChange={values => onChange(values.value)}
      format="# ###### ######"
    />
  );
}

@inject("createProductStore")
@observer
class BarcodeScannerView extends React.Component {
  state = {
    barcode: ""
  };

  constructor(props) {
    super(props);
    props.onNext(this.handleNext);
  }

  handleNext = () => {
    return true;
  };

  handleChange = value => {
    this.setState({
      barcode: value
    });
    if (value.length === 13) {
      this.props.createProductStore.setEan(parseInt(value, 10));
    } else {
      this.props.createProductStore.setEan(-1);
    }
  };

  render() {
    const { classes } = this.props;
    const { barcode } = this.state;

    return (
      <div className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
          <img src={ean13Image} className={classes.barcodeImg} alt="barcode" />
          <TextField
            value={barcode}
            onChange={this.handleChange}
            fullWidth
            autoFocus
            InputProps={{
              inputComponent: NumberFormatCustom,
              classes: {
                input: classes.input
              }
            }}
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(BarcodeScannerView);
