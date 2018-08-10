import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    width: "100%",
    height: "20px",
    borderBottom: "1px solid black",
    textAlign: "center"
  },
  messageTime: {
    backgroundColor: "white",
    fontSize: "18px",
    padding: "10px 10px"
  }
});

const MessageDivider = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <span className={classes.messageTime}>{props.date}</span>
    </div>
  );
};

MessageDivider.propTypes = {
  classes: PropTypes.object.isRequired,
  date: PropTypes.string
};

export default withStyles(styles)(MessageDivider);
