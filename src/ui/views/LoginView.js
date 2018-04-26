import React from "react";
import { inject, observer } from "mobx-react";

import { InputAdornment } from "material-ui/Input";
import { FormControl } from "material-ui/Form";
import TextField from "material-ui/TextField";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";

import KeyIcon from "@material-ui/icons/VpnKey";
import EmailIcon from "@material-ui/icons/Email";

@inject("userStore")
@observer
export default class LoginView extends React.Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };

  componentDidMount() {}

  handleSignupClick = () => {
    this.props.userStore.signup(this.state);
  };

  handleFieldChange = stateKey => event => {
    this.setState({ [stateKey]: event.target.value });
  };

  render() {
    const { userStore } = this.props;
    return (
      <div>
        <Paper elevation={4}>
          <Typography variant="headline" component="h3">
            Account aanmaken
          </Typography>

          <TextField
            label="Voornaam"
            onChange={this.handleFieldChange("firstname")}
            value={this.state.firstname}
            fullWidth
          />

          <TextField
            label="Achternaam"
            onChange={this.handleFieldChange("lastname")}
            value={this.state.lastname}
            fullWidth
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            onChange={this.handleFieldChange("email")}
            value={this.state.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            label="Paswoord"
            type="password"
            onChange={this.handleFieldChange("password")}
            value={this.state.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              )
            }}
          />

          <Button
            variant="raised"
            color="primary"
            onClick={this.handleSignupClick}
          >
            Signup
          </Button>
        </Paper>
      </div>
    );
  }
}
