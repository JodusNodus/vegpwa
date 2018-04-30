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
    props.onNext(this.handleNext);
    this.cropperRef = React.createRef();
  }

  handleNext = () => {
    const dataUrl = this.cropperRef.current.getCroppedCanvas().toBlob(blob => {
      this.props.createProductStore.uploadPicture(blob);
    }, "image/jpeg");
    return true;
  };

  handleChange = evt => {
    const reader = new FileReader();
    const file = evt.target.files[0];

    reader.onload = upload => {
      this.setState({ dataUri: upload.target.result });
      this.props.createProductStore.pictureIsTaken();
    };

    reader.readAsDataURL(file);
  };

  render() {
    const { classes, createProductStore } = this.props;

    return (
      <div className={classes.root}>
        {this.state.dataUri ? (
          <Cropper
            src={this.state.dataUri}
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
                color="secondary"
              >
                foto nemen
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
