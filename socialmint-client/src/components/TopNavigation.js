import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";

const styles = {
  root: {
    width: "100%"
  }
};

class TopNavigation extends React.Component {
  state = {
    value: "search"
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.navigateTo(value);
  };

  navigateTo = page => {
    this.props.history.push(`/${page}`);
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Grid item xs={12}>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            value="search"
            label="Search"
            icon={<SearchIcon />}
          />
          <BottomNavigationAction
            value="favorites"
            label="Favorites"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            value="nearby"
            label="Nearby"
            icon={<LocationOnIcon />}
          />
        </BottomNavigation>
      </Grid>
    );
  }
}

TopNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopNavigation);
