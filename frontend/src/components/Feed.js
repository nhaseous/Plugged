import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    padding: '1rem 10px',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  avatar: {
    margin: 10,
    width: 100,
    height: 100,
  },
});

class Feed extends Component {
  constructor(props) {
    super(props);
  }

    render() {
      const { classes } = this.props;
      return (
        <ListItem button className={classes.root}>
          <Grid container spacing={8} wrap="nowrap">
            <Grid item>
              <Avatar alt="Nha Tran" src="https://cc-media-foxit.fichub.com/image/fox-it-mondofox/e8c0f288-781d-4d0b-98ad-fd169782b53b/scene-sottacqua-per-i-sequel-di-avatar-maxw-654.jpg" className={classes.avatar} />
            </Grid>
            <Grid item>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Typography bold inline>
                    John Doe
                  </Typography>{' '}
                  <Typography light inline>
                    ·
                  </Typography>{' '}
                  <Typography light inline>
                    Dec 17
                  </Typography>
                  <Typography>
                    Hey guys. Welcome to our site. We hope you can be connected to everyone here!
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
      );
    }
}

export default withStyles(styles)(Feed);
