import React from "react";
import { inject, observer } from "mobx-react";

import styles from "./ProductFormView.styles";

import { withStyles } from "material-ui/styles";
import { InputAdornment } from "material-ui/Input";
import { FormControl } from "material-ui/Form";
import TextField from "material-ui/TextField";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import Chip from "material-ui/Chip";
import _ from "lodash";

import ProductPaperLayout from "../components/ProductPaperLayout";

import EmailIcon from "@material-ui/icons/Email";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import AutoCompleteTextField from "../components/AutoCompleteTextField";

@inject("createProductStore")
@observer
class ProductFormView extends React.Component {
  state = {
    fields: {
      labelField: ""
    },
    errors: {}
  };

  constructor(props) {
    super(props);
    props.onNext(this.handleNext);
  }

  handleNext = () => {
    const {
      productLabels,
      brandname,
      productName
    } = this.props.createProductStore;
    const errors = {};

    if (productName.length < 3) {
      errors.productName = "Too short";
    }

    if (brandname.length < 3) {
      errors.brandname = "Too short";
    }

    if (productLabels.length < 1) {
      errors.productLabels = "Minstens 1 label";
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return false;
    } else {
      return true;
    }
  };

  handleFieldChange = stateKey => event => {
    const fields = { ...this.state.fields, [stateKey]: event.target.value };
    this.setState({ fields });
  };

  render() {
    const { classes, createProductStore } = this.props;
    const { fields, errors, showPassword } = this.state;

    return (
      <div className={classes.root}>
        <ProductPaperLayout
          title={
            createProductStore.brandname + " " + createProductStore.productName
          }
          imageSrc={
            createProductStore.pictureUploaded
              ? `https://storage.googleapis.com/vegstorage/cover-${
                  createProductStore.ean
                }`
              : undefined
          }
        >
          <AutoCompleteTextField
            label="Merk"
            options={createProductStore.brands}
            className={classes.input}
            onChange={evt => createProductStore.setBrandName(evt.target.value)}
            error={!!errors.brandname}
            value={createProductStore.brandname}
          />

          <TextField
            fullWidth
            label="Product Naam"
            className={classes.input}
            onChange={evt =>
              createProductStore.setProductName(evt.target.value)
            }
            error={!!errors.productName}
            value={createProductStore.productName}
          />

          {
            // <div>
            //   {createProductStore.productLabels.map((label, i) => (
            //     <Chip
            //       key={i}
            //       label={label}
            //       onDelete={() => createProductStore.removeLabel(label)}
            //       className={classes.chip}
            //     />
            //   ))}
            // </div>
            // <AutoCompleteTextField
            //   label="Labels"
            //   options={createProductStore.productLabels}
            //   className={classes.input}
            //   onChange={this.handleFieldChange("labelField")}
            //   value={fields.labelField}
            // />
          }
        </ProductPaperLayout>
      </div>
    );
  }
}

export default withStyles(styles)(ProductFormView);
