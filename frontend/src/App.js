import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { blue, indigo } from '@material-ui/core/colors'
import DateFnsUtils from '@date-io/date-fns';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Connect from './components/Connect';
import Dashboard from './components/Dashboard';
import Inbox from './components/Inbox';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';

import 'bootstrap/dist/css/bootstrap.min.css';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login'
    }
}

class App extends Component {
    render() {
        return (
          <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Provider store={store}>
                  <Router>
                      <div>
                          <Navbar/>
                          <Route exact path="/" component={Home}/>
                          <div className="container">
                              <Route exact path="/register" component={Register}/>
                              <Route exact path="/login" component={Login}/>
                              <Route exact path="/connect" component={Connect}/>
                              <Route exact path="/dashboard" component={Dashboard}/>
                              <Route exact path="/inbox" component={Inbox}/>
                              <Route exact path="/profile" component={Profile}/>
                              <Route exact path="/profile/edit" component={ ProfileEdit } />
                          </div>
                      </div>
                  </Router>
              </Provider>
            </MuiPickersUtilsProvider>
          </MuiThemeProvider>
        );
    }
}

export default App;
