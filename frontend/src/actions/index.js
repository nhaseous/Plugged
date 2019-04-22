import { ADD_POST, DELETE_POST, FETCH_POST, GET_EVENTS, ADD_EVENT, CLEAR_EVENT } from './types';
import axios from 'axios';

const apiUrl = '/api/posts';

export const createPost = ({ sender, name, avatar, body }) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/add`, {sender, name, avatar, body})
      .then(response => {
        dispatch(createPostSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createPostSuccess =  (data) => {
  return {
    type: ADD_POST,
    payload: {
      _id: data._id,
      body: data.body
    }
  }
};

export const deletePostSuccess = id => {
  return {
    type: DELETE_POST,
    payload: {
      id
    }
  }
}

export const deletePost = id => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/delete/${id}`)
      .then(response => {
        dispatch(deletePostSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchPosts = (posts) => {
  return {
    type: FETCH_POST,
    posts
  }
};

export const fetchAllPosts = () => {
  return (dispatch) => {
    return axios.get('/api/users/me')
        .then(res => {
          axios.get(`${apiUrl}/`)
            .then(response => {
              dispatch(fetchPosts(response.data))
            })
            .catch(error => {
              throw(error);
            });
        });
  };
};

export const getEventsSuccess = (events) => {
  return {
    type: GET_EVENTS,
    events
  }
}

export const getEvents = (query) => {
  return (dispatch) => {
    return axios.post('/api/events/', query)
        .then(response => {
          dispatch(getEventsSuccess(response.data))
        })
        .catch(error => {
          throw(error);
        });
  }
}


export const addEventSuccess = (id) => {
  return {
    type: ADD_EVENT,
    id
  }
}

export const addEvent = (register) => {
  return (dispatch) => {
    return axios.post('/api/events/add', register)
        .then(response => {
          dispatch(addEventSuccess(response.data))
        })
        .catch(error => {
          throw(error);
        });
  }
}

export const clearEventSuccess = id => {
  return {
    type: CLEAR_EVENT,
    payload: {
      id
    }
  }
}

export const clearEvent = id => {
  return (dispatch) => {
    return axios.get(`/api/events/remove/${id}`)
      .then(response => {
        dispatch(clearEventSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};
