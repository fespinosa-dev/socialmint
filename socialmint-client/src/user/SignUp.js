import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { signup } from "../util/APIUtils";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import SnackbarContentWrapper from "../common/SnackbarContent";

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
    name: "",
    username: "",
    password: "",
    email: "",
    open: false,
    success: false
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const signupRequest = {
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };
    signup(signupRequest)
      .then(response => {
        {
          this.setState({ open: true, success: true });
        }
      })
      .catch(error => {
        {
          console.log(error);
          this.setState({ open: true, success: false });
        }
      });
  };

  render() {
    const { username, name, password, email } = this.state;
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
              name="name"
              value={name}
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
              validators={["required", "isEmail"]}
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
              <Link to={"/login"}>Login now!</Link>
            </Typography>
          </ValidatorForm>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          {this.state.success ? (
            <SnackbarContentWrapper
              onClose={this.handleClose}
              variant="success"
              message={
                <p>
                  Thank you! You were successfully registered. Please
                  <Link to="/login"> Login </Link>to continue!
                </p>
              }
            />
          ) : (
            <SnackbarContentWrapper
              onClose={this.handleClose}
              variant="error"
              message={<p>Sorry! Something went wrong. Please try again!</p>}
            />
          )}
        </Snackbar>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
