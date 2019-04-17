import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider/Divider';
import Feed from './Feed';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  content: {
    maxWidth: 1000,
    padding: 5,
    margin: '0 auto',
    width: '100%'
  },
  feed: {
    backgroundColor: '#fff',
  },
});

class Dashboard extends Component {

  componentDidMount() {
      if(!this.props.auth.isAuthenticated) {
          this.props.history.push('/');
      }
  }

    render() {
      const { classes } = this.props;
        return (
          <React.Fragment>
            <CssBaseline />
            <div className={classes.content}>
              <Grid container>
                <Grid item md={10}>
                  <div className={classes.feed}>
                    <Divider />
                    <Feed />
                  </div>
                </Grid>
              </Grid>
            </div>
          </React.Fragment>
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {  })(withStyles(styles)(Dashboard));
