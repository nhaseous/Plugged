import React from 'react';
import { connect } from 'react-redux';
import Event from '../components/Event';
import SearchEvents from './FindEvents';
import { getEvents, addEvent, clearEvent } from '../actions';
import axios from 'axios';
import Button from "@material-ui/core/Button";

const styles = {
  marginRight: 0,
  width: "100%"
}

var curPage = 0;
var maxPage = 0;
var results = 0;
var query = '';
var status = [];
var user = {avatar: ''};
var showMyEvents = false;

function EventList({ events, onPrev, onNext, getEvent, addEvent, clearEvent }) {

  axios.get('/api/events/going').then(res => {
    status = res.data;
    //console.log(status);
  });

  axios.get('/api/users/me').then(res => {
    user.avatar = res.data.avatar;
  })

  //console.log(events);

  if (events.items) {
    curPage = events.page.number+1;
    maxPage = events.page.totalPages;
    results = events.page.totalElements;
    query = events.qs;
  }

  if(!events.items) {
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
            <p style={{textAlign: "right"}}>No results found</p>
            </div>
          </div>
          </div>
        </div>
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
              {!showMyEvents? <SearchEvents /> : ''}
            </div>
            <Button size="small" variant={showMyEvents ? "contained" : "outlined"} color="primary" onClick={() => getEvent()} style={{float: "left"}}>My Events</Button>
            <p style={{textAlign: "right"}}>{showMyEvents ? status.length : results} Results</p>
              <div id="events" className="list-group">
                {!showMyEvents ? (events.items).map(show => {
                  return (
                    <Event user={ user } event={ {name: show.name, dates: show.dates.start.localDate, venue: show._embedded.venues[0].name, city: show._embedded.venues[0].city.name, id: show.id} } key={ show.id } addEvent={ addEvent } clearEvent={ clearEvent } status={ status.find(function(element) {return element.event.id === show.id}) }/>
                  );
                }) : (status).map(show => {
                  return (
                    <Event user={ user } event={ {name: show.event.name, dates: show.event.date, venue: show.event.venue, city: show.event.city, id: show.event.id} } key={ show.event.id } addEvent={ addEvent } clearEvent={ clearEvent } status={ status.find(function(element) {return element.event.id === show.event.id}) }/>
                  );
                }) }
              </div>
            </div>
            <div className="panel-footer" style={{padding: "10px", backgroundColor: "#f5f5f5"}}>
              <nav>
                {!showMyEvents ? <ul className="pager" style={{textAlign: "center", paddingLeft: 0, listStyle: "none"}}>
                  <li id="prev" className="previous"><a href="#" onClick={onPrev} style={{float: "left", padding: "5px 15px", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "15px", color: "#337ab7", textDecoration: "none"}}><span aria-hidden="true">&larr;</span></a></li>
                  <li id="next" className="next"><a href="#" onClick={onNext} style={{float: "right", padding: "5px 15px", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "15px", color: "#337ab7", textDecoration: "none"}}><span aria-hidden="true">&rarr;</span></a></li>
                  <p style={{fontSize: "16px", float: "center", paddingTop: "5px"}}>{curPage}/{maxPage}</p>
                </ul> : ''}
              </nav>
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
        if (query.page > maxPage - 1) {
          query.page = 0;
        }
      }
      dispatch(getEvents(query));
    },
    getEvent: () => {
      showMyEvents = !showMyEvents;
      dispatch(getEvents(query));
    },
    addEvent: register => {
      dispatch(addEvent(register)).then(
        dispatch(getEvents(query))
    )},
    clearEvent: id => {
      dispatch(clearEvent(id)).then(
        dispatch(getEvents(query))
    )},
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList);
