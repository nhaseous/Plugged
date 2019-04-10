import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from "./Posts.js";
import PropTypes from 'prop-types';
import Friends from './Friends';
import axios from 'axios';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { getMe } from '../actions/authentication';

const styles = theme => ({
  main: {
    margin: 25,
  },
  avatar: {
    margin: 10,
    width: 100,
    height: 100,
  },
  editButton: {
    margin: 10,
  },
});

const posts = [
    {
        avatar: '',
        body: 'Your posts can be found here.',
        time: 'December 31, 1999 23:59:59'
    }];



class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        email: '',
        avatar: '',
        location: '',
        bio: '',
        errors: {}
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
      if(!this.props.auth.isAuthenticated) {
          this.props.history.push('/');
      }
      axios.get('/api/users/me')
          .then(res => {
              this.setState({
                  name: res.data.name,
                  avatar: res.data.avatar,
                  location: res.data.location,
                  bio: res.data.bio
              })
          })
  }

  handleClick() {
    this.props.history.push('/profile/edit');
  }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <Grid container className={classes.main}>
                    <Grid item xs={2}>
                        <Avatar alt="Nha Tran" src={this.state.avatar} className={classes.avatar} />
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container>
                            <Typography component="h1" variant="h4">
                              {this.state.name}
                            </Typography>
                            <Button className={classes.editButton} variant="outlined" onClick={this.handleClick}>
                                Edit Profile
                            </Button>
                        </Grid>
                        <Grid container spacing={40}>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    <b>132</b> posts
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    <b>325</b> friends
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="subtitle1">{this.state.location}</Typography>
                        <Typography variant="subtitle2">{this.state.bio}</Typography>
                    </Grid>
                    <Grid item style={{margin: 10}}>
                      <Friends />
                    </Grid>
                    <Grid item xs={7} style={{margin: 10}}> <Table rows = { posts } /></Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

Profile.propTypes = {
    getMe: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { getMe })(withStyles(styles)(Profile));
