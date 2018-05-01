import React from "react";

import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

export default ({ children, title, leftButton, rightButton }) => (
  <AppBar position="static">
    <Toolbar>
      {leftButton}
      <Typography variant="title" color="inherit" style={{ flex: 1 }}>
        {title}
      </Typography>
      {rightButton}
    </Toolbar>
    {children ? <Toolbar>{children}</Toolbar> : undefined}
  </AppBar>
);
