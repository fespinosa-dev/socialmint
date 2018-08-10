import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class UserList extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios
      .get(`http://192.168.8.101:8080/onlineUsers`, { withCredentials: true })
      .then(res => {
        const users = res.data;
        this.setState({ users });
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {this.state.users.map(user => {
            return (
              <ListItem
                key={user.username}
                onClick={() =>
                  this.props.history.push(`/chatroom?username=${user.username}`)
                }
                dense
                button
                className={classes.listItem}
              >
                <Avatar alt="Remy Sharp" src="/static/images/remy.jpg" />
                <ListItemText primary={`${user.username}`.toUpperCase()} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserList);
