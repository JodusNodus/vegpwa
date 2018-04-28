import React, { Component } from "react";

import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

export default ({ children, title }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit">
        {title}
      </Typography>
    </Toolbar>
    {children ? <Toolbar>{children}</Toolbar> : undefined}
  </AppBar>
);
