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
    height: "300px",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    padding: "20px"
  },
  [theme.breakpoints.down("xs")]: {
    root: {
      width: "90%"
    }
  },
  button: {
    marginTop: "20px"
  }
});

class Login extends React.Component {
  loadBackgroundImage() {
    document.body.style.background = `url(${backgroundImage}) center center  no-repeat no-repeat fixed`;
    document.body.style.backgroundSize = "cover";
  }

  render() {
    const { classes } = this.props;
    this.loadBackgroundImage();
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.root}>
          <Typography variant="display2" gutterBottom>
            Social Mint Login
          </Typography>
          <FormControl>
            <InputLabel htmlFor="user">User</InputLabel>
            <Input fullWidth id="user" className={classes.input} />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              fullWidth
              id="password"
              type="password"
              className={classes.input}
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Enter
          </Button>
          <Typography noWrap gutterBottom align="right">
            <Link to={"/signup"}>Forgot password?</Link>
          </Typography>
        </Paper>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
