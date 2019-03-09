import React, { Component } from 'react';
import Messages from './Messages';
import ChatInput from './ChatInput';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";

require('../styles/Inbox.css');

const drawerWidth = 240;

const messages = [
  {username: 'davematthews', message: 'Hey how are you?', fromMe: true},
  {username: 'johnwick', message: 'Not bad, wanna jam?', fromMe: false},
  {username: 'davematthews', message: 'Sure, coming soon.', fromMe: true},
  {username: 'johnwick', message: 'Great, see you soon!', fromMe: false},
]

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: messages };
    this.sendHandler = this.sendHandler.bind(this);
  }

  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message
    };

    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  render() {
    const { classes } = this.props;
      return (
        <React.Fragment>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: "drawerPaper",
          }}
        >
        <div className={classes.toolbar} />
        <div className={classes.toolbar} />
          <List>
            {['New', 'All', 'Archived'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['John Wick', 'Rick Astley', 'Dexter'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Paper className={classes.paper}>
          <div className={classes.header}>
              <h3>Inbox</h3>
          </div>
          <div className="container inbox-container">
          <Messages messages={messages} />
          <ChatInput onSend={this.sendHandler} />
        </div>
      </Paper>
      </React.Fragment>
    );
  }
}

Inbox.defaultProps = {
  username: 'Anonymous'
};

export default withStyles(styles)(Inbox);
