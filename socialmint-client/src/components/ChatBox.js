import React, { Component } from "react";
import queryString from "query-string";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import MessageList from "./MessageList";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const styles = () => ({
  avatar: {
    margin: "0 10px 0 10px",
    height: 60,
    width: 60
  }
});

class ChatBox extends Component {
  socket: {};
  stompClient: {};
  state = {
    value: "",
    messages: []
  };

  componentDidMount() {
    this.socket = new SockJS("http://192.168.8.101:8080/gs-guide-websocket");
    let stompClient = Stomp.over(this.socket);
    stompClient.connect(
      {},
      frame => {
        console.log("Connected: " + frame);
        stompClient.subscribe("/user/queue/reply", message => {
          this.showMessage(message);
        });
      }
    );
    this.stompClient = stompClient;
  }

  showMessage(message) {
    this.setState(prevState => {
      return { messages: [...prevState.messages, JSON.parse(message.body)] };
    });
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleClick = event => {
    this.sendMessage(this.state.value);
    let messageDate = this.formatMessageDate(new Date());
    this.setState(prevState => {
      return {
        messages: [
          ...prevState.messages,
          { date: messageDate, content: this.state.value }
        ]
      };
    });
  };

  sendMessage = content => {
    const values = queryString.parse(this.props.location.search);
    let messageDate = this.formatMessageDate(new Date());
    this.stompClient.send(
      "/app/message",
      {},
      JSON.stringify({
        username: this.props.username,
        to: values.username,
        content: content,
        date: messageDate
      })
    );
  };

  formatMessageDate = date => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      minute: "numeric",
      second: "numeric"
    };
    return date.toLocaleDateString("en-US", options);
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper>
        <Grid item xs={12}>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/remy.jpg"
                    className={classes.avatar}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <MessageList messages={this.state.messages} />
            </Grid>
            <Grid container justify="center">
              <Grid item xs={12}>
                <TextField
                  value={this.state.value}
                  onChange={this.handleChange}
                  placeholder={"type something..."}
                  multiline={true}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={this.handleClick}
                  variant="contained"
                  color="primary"
                >
                  send
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(ChatBox);
