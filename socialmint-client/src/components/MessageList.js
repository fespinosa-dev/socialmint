import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import MessageDivider from './MessageDivider';

const styles = theme => ({

});

class MessageList extends React.Component {



render(){
  const { classes, date } = this.props;

  return (
    <List subheader={<li />}>

        {this.props.messages.map(message => {
          return (<div >
                      <ListItem  key={message.id} >
                        <ListItemText key={message.id} >
                            <p key={message.id} style={message.to != message.username? { float : 'left'} : { float : 'right'} }>{message.content}</p>
                        </ListItemText>
                      </ListItem>
                      <MessageDivider date={message.date}/>
                  </div>)

        })}
    </List>
  );
}
}

MessageList.propTypes = {
  classes: PropTypes.object.isRequired,
  date : PropTypes.object
};

export default withStyles(styles)(MessageList);
