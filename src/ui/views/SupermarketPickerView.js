import React from "react";
import { inject, observer } from "mobx-react";

import styles from "./SupermarketPickerView.styles";

import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import List, { ListItem, ListItemText } from "material-ui/List";
import _ from "lodash";

import StoreIcon from "@material-ui/icons/Store";

@inject("createProductStore")
@observer
class SupermarketPickerView extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    props.onNext(this.handleNext);
  }

  handleNext = () => {
    return true;
  };

  handleClick = evt => {
    const placeid = evt.currentTarget.getAttribute("dataplaceid");
    this.props.createProductStore.setPlaceid(placeid);
  };

  render() {
    const { classes, createProductStore } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={8} md={5}>
          <Paper elevation={4} className={classes.paper}>
            <List>
              {createProductStore.supermarkets.map(
                ({ placeid, name, address }) => (
                  <ListItem
                    button
                    key={placeid}
                    disabled={placeid === createProductStore.placeid}
                    classes={{ disabled: classes.selectedItem }}
                    dataplaceid={placeid}
                    onClick={this.handleClick}
                  >
                    <Avatar>
                      <StoreIcon />
                    </Avatar>
                    <ListItemText primary={name} secondary={address} />
                  </ListItem>
                )
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SupermarketPickerView);
