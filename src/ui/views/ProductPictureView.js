import React from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Icon from "material-ui/Icon";
import Button from "material-ui/Button";

import Cropper from "react-cropper";
import "../../../node_modules/cropperjs/dist/cropper.css";

import styles from "./ProductPictureView.styles";

@inject("createProductStore")
@observer
class ProductPictureView extends React.Component {
  state = {
    dataUri: null
  };

  constructor(props) {
    super(props);
    this.cropperRef = React.createRef();
  }

  handleChange = evt => {
    const reader = new FileReader();
    const file = evt.target.files[0];

    reader.onload = upload => {
      this.props.createProductStore.setOriginalPictureData(
        upload.target.result
      );
    };

    reader.readAsDataURL(file);
  };

  componentWillUnmount() {
    // Back or Next has been pressed
    const dataUrl = this.cropperRef.current.getCroppedCanvas().toDataURL();
    this.props.createProductStore.setCroppedPictureData(dataUrl);
  }

  render() {
    const { classes, createProductStore } = this.props;

    return (
      <div className={classes.root}>
        {createProductStore.originalPictureData.length ? (
          <Cropper
            src={createProductStore.originalPictureData}
            ref={this.cropperRef}
            aspectRatio={4 / 3}
            className={classes.cropper}
          />
        ) : (
          <div>
            <input
              id="picture-input"
              className={classes.fileInput}
              type="file"
              capture="camera"
              accept="image/*"
              onChange={this.handleChange}
            />
            <label htmlFor="picture-input">
              <Button
                variant="raised"
                component="span"
                className={classes.button}
              >
                Upload
                <Icon className={classes.rightBtnIcon}>camera_alt</Icon>
              </Button>
            </label>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(ProductPictureView);
