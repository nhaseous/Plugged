import React, { Component } from 'react';
import CreatePost from '../containers/CreatePost';
import { withStyles } from '@material-ui/core/styles';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from '../reducers';
import { fetchAllPosts } from '../actions/index';
import PostList from '../containers/PostList';

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
  }

    render() {
      return (
        <Provider store={store}>
          <div className="container">
            <div className="col">
              <div className="row-md-6">
                <CreatePost />
              </div>
              <div className="row-md-6">
                <PostList />
              </div>
            </div>
          </div>
        </Provider>
      );
    }
}

export default withStyles(styles)(Feed);
