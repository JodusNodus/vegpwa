import React from "react";
import { inject, observer } from "mobx-react";
import Chip from "material-ui/Chip";
import Paper from "material-ui/Paper";
import AutoCompleteTextField from "../components/AutoCompleteTextField";

import styles from "./LabelPickerView.styles";
import { withStyles } from "material-ui/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import { InputAdornment } from "material-ui/Input";

@inject("createProductStore")
@observer
class LabelPickerView extends React.Component {
  state = {
    labelField: ""
  };

  handleChange = evt => {
    this.setState({
      labelField: evt.target.value.toLowerCase().replace(/,| |\n/gi, "")
    });
  };

  handleAdd = (labelField = this.state.labelField) => {
    if (labelField.length > 1) {
      this.props.createProductStore.addLabel(labelField);
      this.setState({ labelField: "" });
    }
  };

  handleSuggestionSelected = (evt, { suggestionValue }) => {
    this.handleAdd(suggestionValue);
  };

  handleKeyPress = evt => {
    switch (evt.key) {
      case " ":
      case ",":
      case "Enter":
        this.handleAdd();
        break;
    }
  };

  handleSuggestionLabelAdd = label => {
    this.props.createProductStore.removeLabelSuggestion(label);
    this.handleAdd(label);
  };

  render() {
    const { classes, createProductStore } = this.props;
    const { labelField } = this.state;
    return (
      <div className={classes.root}>
        <Paper
          elevation={4}
          className={[classes.paper, classes.chipsContainer].join(" ")}
        >
          {createProductStore.productLabels.length < 1 ? (
            <Typography
              variant="subheading"
              className={classes.emptyLabelsText}
            >
              Nog geen labels toegevoegd
            </Typography>
          ) : (
            createProductStore.productLabels.map((label, i) => (
              <Chip
                key={i}
                label={label}
                onDelete={() => createProductStore.removeLabel(label)}
                className={classes.chip}
              />
            ))
          )}
        </Paper>
        <Paper elevation={4} className={classes.paper}>
          <AutoCompleteTextField
            label="Nieuwe label"
            options={createProductStore.labels}
            className={classes.input}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            onSuggestionSelected={this.handleSuggestionSelected}
            value={labelField}
            endAdornment={
              <InputAdornment position="end">
                <Tooltip title="Toevoegen">
                  <IconButton
                    className={classes.button}
                    aria-label="Add"
                    onClick={() => this.handleAdd()}
                  >
                    <AddCircleIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            }
          />
        </Paper>
        {createProductStore.labelSuggestions.length > 0 ? (
          <Paper
            elevation={4}
            className={[classes.paper, classes.chipsContainer].join(" ")}
          >
            <Typography variant="subheading">
              Suggesties gebaseerd op de product foto
              <Typography variant="caption">Klik om toe te voegen</Typography>
            </Typography>
            {createProductStore.labelSuggestions.map((label, i) => (
              <Chip
                key={i}
                label={label}
                className={classes.chip}
                onClick={() => this.handleSuggestionLabelAdd(label)}
              />
            ))}
          </Paper>
        ) : (
          undefined
        )}
      </div>
    );
  }
}

export default withStyles(styles)(LabelPickerView);
