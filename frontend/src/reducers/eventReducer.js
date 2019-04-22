import { GET_EVENTS, ADD_EVENT, CLEAR_EVENT } from '../actions/types';

export default function postReducer(state = [], action) {
  switch (action.type) {
    case GET_EVENTS:
      return action.events;
    case ADD_EVENT:
      return action.id;
    case CLEAR_EVENT:
      return action.payload;
    default:
      return state;
  }
}
