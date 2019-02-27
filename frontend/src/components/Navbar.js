import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

const logo = require('../assets/logo.svg');

const styles = theme => ({
  appBar: {
    position: 'relative',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey['100']}`,
    backgroundColor: 'white',

  },
  flex: {
    //display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }
  },
  inline: {
    display: 'inline'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  productLogo: {
    display: 'inline-block',
    borderLeft: `1px solid ${theme.palette.grey['A100']}`,
    marginLeft: 25,
    paddingLeft: 25
  },
  tagline: {
    display: 'inline-block',
    marginLeft: 10
  }
})

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/inbox">Messages</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/connect">Connect</Link>
              </li>
              <li className="nav-item">
                  <a href="#" className="nav-link" onClick={this.onLogout.bind(this)}>
                      <img src={user.avatar} alt={user.name} title={user.name}
                          className="rounded-circle"
                          style={{ width: '25px', marginRight: '5px'}} />
                              Logout
                  </a>
                </li>
            </ul>
        )
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Sign In</Link>
            </li>
        </ul>
      )
      const { classes } = this.props;
        return(
          <AppBar position="absolute" color="default" className={classes.appBar}>
            <Toolbar>
              <Grid container spacing={24} alignItems="baseline">
                <Grid item xs={12} alignItems='baseline' className={classes.flex}>
                  <React.Fragment>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                      <div className={classes.inline}>
                        <Typography variant="h5" color="inherit" noWrap>
                          <Link to='/' className={classes.link}>
                            <img width={20} src={logo} />
                            <span className={classes.tagline}>Plugged</span>
                          </Link>
                        </Typography>
                      </div>
                      <div className={classes.productLogo}>
                        Stay connected
                      </div>
                      <div className="collapse navbar-collapse" id="navbarSupportedContent">
                          {isAuthenticated ? authLinks : guestLinks}
                      </div>
                    </nav>
                  </React.Fragment>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(withStyles(styles)(Navbar)));
