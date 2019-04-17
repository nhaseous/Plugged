import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import postReducer from './postReducer';
import eventReducer from './eventReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    posts: postReducer,
    events: eventReducer
});
