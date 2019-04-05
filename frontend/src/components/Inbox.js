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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button/Button';
import Avatar from '@material-ui/core/Avatar';

require('../styles/Inbox.css');

const drawerWidth = 240;

const messages = [
  {username: 'Connected', message: 'Start chatting by adding a user!', fromMe: false}
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
    this.state = {
      me: {id: '', name: '', avatar: ''},
      current: {id: '', name: 'Inbox', email: ''},
      connections: [],
      messages: messages,
      open: false
    };
    this.sendHandler = this.sendHandler.bind(this);
    this.newChat = this.newChat.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.switchMsg = this.switchMsg.bind(this);
    this.getFriends = this.getFriends.bind(this);
  }

  componentDidMount() {
      if(!this.props.auth.isAuthenticated) {
          this.props.history.push('/');
      }
      axios.get('/api/users/me')
          .then(res => {
            this.setState({
              me: {
                id: res.data.id,
                name: res.data.name,
                avatar: res.data.avatar
              }
            });
          });
      this.getFriends();
  }

  getFriends() {
    axios.get('/api/users/me/connections')
        .then(res => {
          let connections = (res.data.connections).map(function (element) {
            return axios.get(`/api/users/${element._id}`)
              .then(response => {
                return response.data;
              })
          });
          Promise.all(connections).then(users => {
            console.log(users);
            this.setState({connections: users.reverse()});
            if (this.state.connections[0]) {
              this.switchMsg(this.state.connections[0]);
            }
            this.forceUpdate();
          });
        });
  }

  sendHandler(message) {
    axios.post('/api/messages/add', {message: message, id: this.state.current.id})
        .then(res => {
          console.log(res.data);
          this.switchMsg({id: this.state.current.id, name: this.state.current.name});
          this.getFriends();
          this.forceUpdate();
        })
  }

  newChat() {
    axios.post('/api/messages/add/user', {email: this.state.current.email})
        .then(res => {
          console.log(res.data);
          this.getFriends();
          this.handleClose();
        })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  switchMsg(e) {
    axios.post('/api/messages/get', {id: e.id})
        .then(res => {
          this.setState({current: {id: e.id, name: e.name}});
          let me = this.state.me;
          let newMessages = ((res.data).reverse()).map(function (element) {
            let message = {message: element.message.text, username: '', fromMe: false};
            if (element.sender == me.id) {
              message.fromMe = true;
            } else {
              message.username = e.name;
            }
            return message;
          })
          this.setState({messages: newMessages});
        });
  }

  handleInputChange(e) {
      this.setState({
          current: {id: this.state.current.id, name: this.state.current.name, email: e.target.value}
      })
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
          <List>
            <ListItem button key="New" onClick={this.handleClickOpen}>
              <ListItemIcon><MailIcon /></ListItemIcon>
              <ListItemText primary='New' />
            </ListItem>
          </List>
          <Divider />
          <List>
            {(this.state.connections).map(({id, name, avatar}) => (
              <ListItem button key={id} onClick={() => this.switchMsg({id: id, name: name})}>
                <ListItemIcon><Avatar alt="User pic" src={avatar}/></ListItemIcon>
                <ListItemText primary={name} style={{paddingRight: 0}} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Paper className={classes.paper}>
          <div className={classes.header}>
              <h3>{this.state.current.name}</h3>
          </div>
          <div className="container inbox-container">
          <Messages messages={this.state.messages} />
          <ChatInput onSend={this.sendHandler} />
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            onChange={this.handleInputChange}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Enter email</DialogTitle>
            <DialogContent>
              <DialogContentText>
                What's the email of the person you want to connect to?
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.newChat} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Paper>
      </React.Fragment>
    );
  }
}

Inbox.defaultProps = {
  username: 'Anonymous'
};

Inbox.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {  })(withStyles(styles)(Inbox));
