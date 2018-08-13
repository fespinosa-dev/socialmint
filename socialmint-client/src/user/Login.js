import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import backgroundImage from "./background.png";
import { Link } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import { login } from "../util/APIUtils";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

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

class Login extends React.Component {
  state = {
    usernameOrEmail: "",
    password: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  loadBackgroundImage() {
    document.body.style.background = `url(${backgroundImage}) center center  no-repeat no-repeat fixed`;
    document.body.style.backgroundSize = "cover";
  }

  handleSubmit = () => {
    const { usernameOrEmail, password } = this.state;
    login({ usernameOrEmail, password })
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        this.props.onLogin();
      })
      .catch(error => {
        if (error.status === 401) {
          console.log("error !!!!!!!!!!");
        } else {
        }
      });
  };

  render() {
    const { usernameOrEmail, password } = this.state;
    const { classes } = this.props;
    this.loadBackgroundImage();
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.root}>
          <ValidatorForm className={classes.form} onSubmit={this.handleSubmit}>
            <Typography variant="display2" gutterBottom>
              Social Mint Login
            </Typography>
            <TextValidator
              label="Username or Email"
              onChange={this.handleChange}
              name="usernameOrEmail"
              value={usernameOrEmail}
              validators={["required"]}
              errorMessages={["this field is required"]}
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
              Login
            </Button>
            <Typography noWrap gutterBottom align="left">
              Or
              <Link to={"/signup"}>Register</Link>
            </Typography>
          </ValidatorForm>
        </Paper>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
