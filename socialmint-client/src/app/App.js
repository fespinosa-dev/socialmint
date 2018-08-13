import React, { Component } from "react";
import MenuBar from "../components/MenuBar";
import UserList from "../components/UserList";
import ChatBox from "../components/ChatBox";
import TopNavigation from "../components/TopNavigation";
import { Route, Switch, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Login from "../user/Login";
import SignUp from "../user/SignUp";
import { getCurrentUser } from "../util/APIUtils";
import { ACCESS_TOKEN } from "../constants";
import PrivateRoute from "../common/PrivateRoute";
import "./App.css";

class App extends Component {
  state: {
    currentUser: null,
    isAuthenticated: false,
    isLoading: false
  };

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }

  componentWillMount() {
    this.loadCurrentUser();
  }

  handleLogout = (
    redirectTo = "/login",
    notificationType = "success",
    description = "You're successfully logged out."
  ) => {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
  };

  handleLogin = () => {
    this.loadCurrentUser();
    this.props.history.push("/home");
  };

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={props => <Login onLogin={this.handleLogin} {...props} />}
        />
        <Route exact path="/signup" component={SignUp} />

        <Grid container spacing={0}>
          <PrivateRoute
            authenticated={this.state.isAuthenticated}
            exact
            path="/(home|search|favorites|nearby)"
            component={MenuBar}
          />
          <Grid item xs={12}>
            <PrivateRoute
              authenticated={this.state.isAuthenticated}
              exact
              path="/(home|search|favorites|nearby)"
              component={TopNavigation}
            />
          </Grid>
          <Grid item xs={12}>
            <PrivateRoute path="/search" component={UserList} />
            <PrivateRoute
              authenticated={this.state.isAuthenticated}
              path="/chatroom"
              component={ChatBox}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(App);
