import React, { Component } from "react";
import MenuBar from "../components/MenuBar";
import UserList from "../components/UserList";
import ChatBox from "../components/ChatBox";
import TopNavigation from "../components/TopNavigation";
import { Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Login from "../user/Login";
import { withCookies, Cookies } from "react-cookie";

// import logo from './logo.svg';
import "./App.css";

class App extends Component {
  render() {
    const { cookies } = this.props;

    return (
      <div className="App">
        <Route exact path="/" component={Login} />
        <Grid container spacing={0}>
          <Route
            exact
            path="/(home|search|favorites|nearby)"
            render={() => {
              return (
                <Grid item xs={12}>
                  <MenuBar />
                </Grid>
              );
            }}
          />
          <Grid item xs={12}>
            <Route
              exact
              path="/(home|search|favorites|nearby)"
              render={props => {
                return (
                  <Grid item xs={12}>
                    <TopNavigation history={props.history} />
                  </Grid>
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Route
              path="/search"
              render={props => {
                return (
                  <Paper>
                    <Grid item xs={12}>
                      <UserList history={props.history} />
                    </Grid>
                  </Paper>
                );
              }}
            />
            <Route
              path="/chatroom"
              render={props => {
                return (
                  <Paper>
                    <Grid item xs={12}>
                      <ChatBox
                        userLoggedIn={cookies.get("JUSERNAME")}
                        location={props.location}
                      />
                    </Grid>
                  </Paper>
                );
              }}
            />
          </Grid>
        </Grid>
        {/*  />
      <Route path='/' component={TopNavigation} />
      <Route path='/search' component={UserList} />
      <Route path='/chatroom' component={ChatBox}/> */}
      </div>
    );
  }
}

export default withCookies(App);
