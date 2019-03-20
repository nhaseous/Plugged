import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from "./Posts.js";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

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
        imgSrc: "https://cc-media-foxit.fichub.com/image/fox-it-mondofox/e8c0f288-781d-4d0b-98ad-fd169782b53b/scene-sottacqua-per-i-sequel-di-avatar-maxw-654.jpga",
        msg: 'Rolling Loud was amazing',
        time: 'December 17, 2018 03:24:00'
    },
    {
        imgSrc: "https://cc-media-foxit.fichub.com/image/fox-it-mondofox/e8c0f288-781d-4d0b-98ad-fd169782b53b/scene-sottacqua-per-i-sequel-di-avatar-maxw-654.jpga",
        msg: 'Kanye is going crazy',
        time: 'December 18, 2018 03:24:00'
    },
    {
        imgSrc: "https://cc-media-foxit.fichub.com/image/fox-it-mondofox/e8c0f288-781d-4d0b-98ad-fd169782b53b/scene-sottacqua-per-i-sequel-di-avatar-maxw-654.jpga",
        msg: 'I cannot wait for Schoolboys album',
        time:'December 19, 2018 03:24:00'
    }];

class Profile extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
      if(!this.props.auth.isAuthenticated) {
          this.props.history.push('/');
      }
  }

  handleClick() {
    this.props.history.push('/profile/edit');
  }

    render() {
        const { classes } = this.props;
        const {isAuthenticated, user} = this.props.auth;
        return (
            <React.Fragment>
                <CssBaseline />
                <Grid container className={classes.main}>
                    <Grid item xs={2}>
                        <Avatar alt="Nha Tran" src={user.avatar} className={classes.avatar} />
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container>
                            <Typography component="h1" variant="h4" lightWeight>
                                {user.name}
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
                        <Typography variant="subtitle1">Vanderbilt University</Typography>
                        <Typography variant="subtitle1">I am who I say I am.</Typography>
                    </Grid>
                </Grid>
                <Table rows = { posts } />
            </React.Fragment>
        );
    }
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {  })(withStyles(styles)(Profile));
