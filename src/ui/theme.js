import { createMuiTheme } from "material-ui/styles";
import purple from "material-ui/colors/purple";
import amber from "material-ui/colors/amber";
import red from "material-ui/colors/red";

export default createMuiTheme({
  palette: {
    primary: purple,
    secondary: amber,
    error: red,
    contrastThreshold: 3
  }
});
