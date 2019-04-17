import { connect } from 'react-redux';
import { getEvents } from '../actions';
import SearchEvents from '../components/SearchEvents';

const mapDispatchToProps = dispatch => {
  return {
    searchEvents: query => {
      dispatch(getEvents(query));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SearchEvents);
