import React from "react";
import { inject, observer } from "mobx-react";
import { STATE } from "../../constants";

import styles from "./LoginView.styles";

import { withStyles } from "material-ui/styles";
import { InputAdornment } from "material-ui/Input";
import Snackbar from "material-ui/Snackbar";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";

import SplashView from "./SplashView";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

@inject("userStore")
@observer
class LoginView extends React.Component {
  state = {
    fields: {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    },
    errors: {},
    loginForm: true,
    showPassword: false
  };

  componentDidMount() {
    this.props.userStore.checkLogin();
  }

  handleSignupClick = () => {
    const { fields, loginForm } = this.state;
    const { firstname, lastname, email, password } = fields;
    const errors = {};

    if (!loginForm && firstname.length < 3) {
      errors.firstname = "Too short";
    }

    if (!loginForm && lastname.length < 3) {
      errors.lastname = "Too short";
    }

    if (email.length < 4 || !EMAIL_REGEX.test(email)) {
      errors.email = "Incorrect email";
    }

    if (password.length < 3) {
      errors.password = "Too short";
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
    } else if (loginForm) {
      this.props.userStore.login(this.state.fields);
    } else {
      this.props.userStore.signup(this.state.fields);
    }
  };

  handleFieldChange = stateKey => event => {
    const fields = { ...this.state.fields, [stateKey]: event.target.value };
    this.setState({ fields });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleLoginToggle = () => {
    this.setState({ loginForm: !this.state.loginForm });
  };

  render() {
    const { classes, userStore } = this.props;
    const { fields, errors, showPassword, loginForm } = this.state;

    if (userStore.loginState === STATE.pending) {
      return <SplashView text="Logging in" />;
    }
    if (userStore.locationState === STATE.pending) {
      return <SplashView text="Locatie bepalen" />;
    }

    return (
      <div className={classes.root}>
        <Paper elevation={4} className={classes.paper}>
          <Typography variant="headline" component="h3">
            {loginForm ? "Inloggen" : "Account aanmaken"}
          </Typography>

          {!loginForm && (
            <TextField
              label="Voornaam"
              className={classes.input}
              onChange={this.handleFieldChange("firstname")}
              error={!!errors.firstname}
              value={fields.firstname}
              fullWidth
            />
          )}
          {!loginForm && (
            <TextField
              label="Achternaam"
              className={classes.input}
              onChange={this.handleFieldChange("lastname")}
              error={!!errors.lastname}
              value={fields.lastname}
              fullWidth
            />
          )}

          <TextField
            fullWidth
            label="Email"
            type="email"
            className={classes.input}
            onChange={this.handleFieldChange("email")}
            error={!!errors.email}
            value={fields.email}
          />

          <TextField
            fullWidth
            label="Paswoord"
            className={classes.input}
            onChange={this.handleFieldChange("password")}
            error={!!errors.password}
            type={showPassword ? "text" : "password"}
            value={fields.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <div className={classes.btnContainer}>
            <Button className={classes.btn} onClick={this.handleLoginToggle}>
              {loginForm ? "Niet geregistreerd" : "Al geregistreerd"}
            </Button>

            <Button
              variant="raised"
              color="primary"
              className={classes.btn}
              onClick={this.handleSignupClick}
            >
              {loginForm ? "Login" : "Registreren"}
            </Button>
          </div>
        </Paper>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={userStore.loginState === STATE.error}
          autoHideDuration={5000}
          SnackbarContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              {loginForm ? "Login incorrect" : "Registratie mislukt"}
            </span>
          }
        />
      </div>
    );
  }
}

export default withStyles(styles)(LoginView);
