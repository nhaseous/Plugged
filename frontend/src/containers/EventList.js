import React from 'react';
import { connect } from 'react-redux';
import Event from '../components/Event';
import SearchEvents from './FindEvents';
import { getEvents } from '../actions';

const styles = {
  marginRight: 0,
  width: "100%"
}

var maxPage = 0;
var query = ''

function EventList({ events, onPrev, onNext }) {

  if (events.items) {
    maxPage = events.page.totalPages;
    query = events.qs;
  }

  if(!events.items) {
    return (
      <div>
        No Events
      </div>
    )
  }
  return (
      <div className="container" style={styles}>
        <div className="row">
          <div className="col-xs-6">
          <div id='events-panel' className="panel panel-primary" style={{background: "#337ab7", border: "1px solid #337ab7"}}>
            <div className="panel-heading" style={{padding: "10px 10px 0px 10px"}}>
              <p className="panel-title" style={{background: "#337ab7", color: "white", fontSize: "25px"}}>Events</p>
            </div>
            <div className="panel-body" style={{padding: "10px", background: "white", fontSize: "14px", lineHeight: "1.4"}}>
            <div style={{background: "white"}}>
              <SearchEvents />
            </div>
              <div id="events" className="list-group">
                {(events.items).map(show => {
                  return (
                    <Event event={ show } key={ show.id }/>
                  );
                })}
              </div>
            </div>
            <div className="panel-footer" style={{padding: "10px", backgroundColor: "#f5f5f5"}}>
              <nav>
                <ul className="pager" style={{textAlign: "center", paddingLeft: 0, listStyle: "none"}}>
                  <li id="prev" className="previous"><a href="#" onClick={onPrev} style={{float: "left", padding: "5px 15px", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "15px", color: "#337ab7", textDecoration: "none"}}><span aria-hidden="true">&larr;</span></a></li>
                  <li id="next" className="next"><a href="#" onClick={onNext} style={{float: "right", padding: "5px 15px", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "15px", color: "#337ab7", textDecoration: "none"}}><span aria-hidden="true">&rarr;</span></a></li>
                </ul>
              </nav>
            </div>
          </div>

          <div id='attraction-panel' className="panel panel-primary" style={{display: "none"}}>
            <div className="panel-heading">
              <h3 className="panel-title">Attraction</h3>
            </div>
            <div id="attraction" className="panel-body">
              <h4 className="list-group-item-heading">Attraction title</h4>
              <img className="col-xs-12" src="" />
              <p id="classification"></p>
            </div>
          </div>
          </div>
        </div>
      </div>
  );
}

const mapStateToProps = state => {
  return {
    events: state.events
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPrev: () => {
      query.page = query.page - 1;
      if (query.page < 0) {
        query.page = 0;
      }
      dispatch(getEvents(query));
    },
    onNext: () => {
      query.page = query.page + 1;
      // need to check for edge cases
      if (query.page > 0) {
        if (maxPage & query.page > maxPage - 1) {
          query.page = 0;
        }
      }
      dispatch(getEvents(query));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList);
