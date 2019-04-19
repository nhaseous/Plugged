import React, { Component } from 'react';
import CreatePost from '../containers/CreatePost';
import { withStyles } from '@material-ui/core/styles';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from '../reducers';
import { fetchAllPosts, getEvents } from '../actions/index';
import PostList from '../containers/PostList';
import EventList from '../containers/EventList';

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

const store = createStore(rootReducer, applyMiddleware(thunk));
// store.dispatch(fetchAllPosts());


class Feed extends Component {

  componentDidMount() {
    store.dispatch(fetchAllPosts());
    store.dispatch(getEvents({page: 0, classificationId: "KZFzniwnSyZfZ7v7nJ"}));
  }

    render() {
      return (
        <Provider store={store}>
          <div className="row">
            <div className="col-sm-8">
              <div className="row-sm-6">
                <CreatePost />
              </div>
              <div className="row-sm-6">
                <PostList />
              </div>
            </div>
            <div className="col-sm-4">
              <EventList />
            </div>
          </div>
        </Provider>
      );
    }
}

export default withStyles(styles)(Feed);
