import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider/Divider';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getFriends } from '../actions/authentication';
import { connect } from 'react-redux';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Grid from '@material-ui/core/Grid';

var friends = [];

const styles = theme => ({

});

class Friends extends Component {
  constructor(props) {
    super(props);

    this.showFriends = this.showFriends.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.pendingFriends = this.pendingFriends.bind(this);
    this.addFriend = this.addFriend.bind(this);

    this.showFriends();
  }

  state = {
    open: false,
    email: ''
  };

  showFriends() {
    axios.get('/api/users/me/friends')
        .then(res => {
          friends = res.data.friends;
          this.forceUpdate();
        })
  }

  handleInputChange(e) {
      this.setState({
          email: e.target.value
      })
  }

  addFriend() {
    axios.post('/api/users/me/friends/add', {'email': this.state.email})
        .then(res => {
        })
  }

  pendingFriends() {
    axios.get('/api/users/me/friends/pending')
        .then(res => {
          friends = res.data;
          this.forceUpdate();
        })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Paper>
        <List subheader={<ListSubheader>Friends</ListSubheader>}>
        <Button variant="contained" color="secondary" onClick={this.showFriends}>
          <PeopleIcon style={{width: 50}}/>
        </Button>
        <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
          <PersonAddIcon style={{width: 50}}/>
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          onChange={this.handleInputChange}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Friend</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the email address of the friend you want to add.
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
            <Button onClick={this.addFriend} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <Button variant="contained" color="default" onClick={this.pendingFriends}>
          <NotificationsActiveIcon style={{width: 50}}/>
        </Button>
          {friends.map(({_id, friend }) => (
            <React.Fragment key={_id}>
            <Grid container>
              <Grid item>
                <ListItem button>
                  <Avatar link src={friend.avatar} />
                  <ListItemText primary={friend.name} secondary={friend.email} />
                </ListItem>
              </Grid>
              <Grid item>
              {// add delete friend feature
              }
              </Grid>
            </Grid>
              <Divider />
            </React.Fragment>
          ))}
          <ListItem button>
            <ListItemText>
            </ListItemText>
          </ListItem>
        </List>
      </Paper>
    );
  };
}

Friends.propTypes = {
    getFriends: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { getFriends })(withStyles(styles)(Friends));
