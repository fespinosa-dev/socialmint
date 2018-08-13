import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const styles = theme => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing.unit * 2
  },
  root: {
    marginTop: "15%",
    width: "40%",
    height: "50%"
  },
  [theme.breakpoints.down("xs")]: {
    root: {
      width: "90%"
    }
  },
  button: {
    marginTop: "20px"
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    padding: "20px"
  }
});

class SignUp extends React.Component {
  state = {
    fullName: "",
    username: "",
    password: "",
    email: ""
  };

  handleChange = event => {};

  handleSubmit = event => {};

  render() {
    const { username, fullName, password, email } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.root}>
          <ValidatorForm className={classes.form} onSubmit={this.handleSubmit}>
            <Typography variant="display2" gutterBottom>
              Sign Up
            </Typography>
            <TextValidator
              label="Full Name"
              onChange={this.handleChange}
              name="fullName"
              value={fullName}
            />
            <TextValidator
              label="username"
              onChange={this.handleChange}
              name="username"
              value={username}
              validators={["required"]}
              errorMessages={["this field is required"]}
              className={classes.input}
            />
            <TextValidator
              label="email"
              onChange={this.handleChange}
              name="email"
              value={email}
              validators={["required"]}
              errorMessages={["this field is required"]}
              className={classes.input}
            />
            <TextValidator
              label="Password"
              onChange={this.handleChange}
              name="password"
              type="password"
              value={password}
              validators={["required"]}
              errorMessages={["this field is required"]}
              className={classes.input}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Sign up
            </Button>
            <Typography noWrap gutterBottom align="left">
              Already registered?
              <Link to={"/"}>Login now!</Link>
            </Typography>
          </ValidatorForm>
        </Paper>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
