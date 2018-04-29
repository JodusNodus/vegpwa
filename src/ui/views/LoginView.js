import React from "react";
import { inject, observer } from "mobx-react";

import styles from "./LoginView.styles";

import { withStyles } from "material-ui/styles";
import { InputAdornment } from "material-ui/Input";
import { FormControl } from "material-ui/Form";
import TextField from "material-ui/TextField";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";

import EmailIcon from "@material-ui/icons/Email";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

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
    showPassword: false
  };

  componentDidMount() {}

  handleSignupClick = () => {
    const { firstname, lastname, email, password } = this.state.fields;
    const errors = {};

    if (firstname.length < 3) {
      errors.firstname = "Too short";
    }

    if (lastname.length < 3) {
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

  render() {
    const { userStore, classes } = this.props;
    const { fields, errors, showPassword } = this.state;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={4} className={classes.paper}>
            <Typography variant="headline" component="h3">
              Account aanmaken
            </Typography>

            <TextField
              label="Voornaam"
              className={classes.input}
              onChange={this.handleFieldChange("firstname")}
              error={!!errors.firstname}
              value={fields.firstname}
              fullWidth
            />

            <TextField
              label="Achternaam"
              className={classes.input}
              onChange={this.handleFieldChange("lastname")}
              error={!!errors.lastname}
              value={fields.lastname}
              fullWidth
            />

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
              <Button
                variant="raised"
                color="primary"
                className={classes.btn}
                onClick={this.handleSignupClick}
              >
                Signup
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(LoginView);
