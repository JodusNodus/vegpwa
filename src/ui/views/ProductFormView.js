import React from "react";
import { inject, observer } from "mobx-react";

import styles from "./ProductFormView.styles";

import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";

import ProductPaperLayout from "../components/ProductPaperLayout";

import AutoCompleteTextField from "../components/AutoCompleteTextField";

@inject("createProductStore")
@observer
class ProductFormView extends React.Component {
  state = {
    errors: {}
  };

  constructor(props) {
    super(props);
    props.onNext(this.handleNext);
  }

  handleNext = () => {
    const { brandname, productName } = this.props.createProductStore;
    const errors = {};

    if (productName.length < 3) {
      errors.productName = "Too short";
    }

    if (brandname.length < 3) {
      errors.brandname = "Too short";
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return false;
    } else {
      return true;
    }
  };

  render() {
    const { classes, createProductStore } = this.props;
    const { errors } = this.state;

    return (
      <div className={classes.root}>
        <ProductPaperLayout
          title={
            createProductStore.brandname + " " + createProductStore.productName
          }
          imageSrc={createProductStore.coverPicture}
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
        </ProductPaperLayout>
      </div>
    );
  }
}

export default withStyles(styles)(ProductFormView);
