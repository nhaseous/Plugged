import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

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

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container className={classes.main}>
          <Grid item xs={2}>
            <Avatar alt="Nha Tran" src="https://cc-media-foxit.fichub.com/image/fox-it-mondofox/e8c0f288-781d-4d0b-98ad-fd169782b53b/scene-sottacqua-per-i-sequel-di-avatar-maxw-654.jpg" className={classes.avatar} />
          </Grid>
          <Grid item xs={8}>
            <Grid container>
              <Typography component="h1" variant="h4" lightWeight>
                 Nha Tran
              </Typography>
              <Button className={classes.editButton} variant="outlined">
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
                  <b>325</b> followers
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  <b>260</b> following
                </Typography>
              </Grid>
            </Grid>
              <Typography variant="subtitle1">Vanderbilt University</Typography>
              <Typography variant="subtitle1">I am who I say I am.</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={32}>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://via.placeholder.com/500/f5f5f5"
            />
            </Grid>
            <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://via.placeholder.com/500/f5f5f5"
            />
            </Grid>
            <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://via.placeholder.com/500/f5f5f5"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Profile);
