import React, { Component } from "react";

import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

export default ({ children }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit">
        Title
      </Typography>
    </Toolbar>
    <Toolbar>{children}</Toolbar>
  </AppBar>
);
