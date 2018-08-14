import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { geLoggedInUsers } from "../util/APIUtils";

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
    geLoggedInUsers().then(data => {
      console.log(data);
      const users = data;
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper>
        <Grid item xs={12}>
          <div className={classes.root}>
            <List>
              {this.state.users.map(user => {
                return (
                  <ListItem
                    key={user.username}
                    onClick={() =>
                      this.props.history.push(
                        `/chatroom?username=${user.username}`
                      )
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
        </Grid>
      </Paper>
    );
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserList);
