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

class BarcodeScannerView extends React.Component {
  state = {
    barcode: ""
  };

  handleChange = value => {
    this.setState({
      barcode: value
    });
  };

  render() {
    const { classes } = this.props;
    const { barcode } = this.state;

    return (
      <div className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
          <img src={ean13Image} className={classes.barcodeImg} />
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
