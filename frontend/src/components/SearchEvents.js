import React, { Component, useState } from 'react';
import Input from '@material-ui/core/Input';
import { InlineDateTimePicker } from "material-ui-pickers";

class SearchEvents extends Component {

  state = {
    startDate: null,
    endDate: null
  };

  handleSubmit = e => {
    e.preventDefault();
    var query = {
      keyword: document.getElementById("keyword").value,
      city: document.getElementById("city").value,
      page: 0,
      startDateTime: this.state.startDate,
      endDateTime: this.state.endDate
    };
    this.props.searchEvents(query);
  };

  componentDidMount() {

  }

  handleStartDateChange = e => {
    this.setState({startDate: e});
  }
  handleEndDateChange = e => {
    this.setState({endDate: e});
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <div className="form-control">
              <Input
                id="keyword"
                placeholder="Keyword"
                inputProps={{
                  'aria-label': 'Description',
                }}
                style={{width: "100%"}}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-control">
              <Input
                id="city"
                placeholder="City"
                inputProps={{
                  'aria-label': 'Description',
                }}
                style={{width: "100%"}}
              />
            </div>
          </div>
          <div className="picker">
          <InlineDateTimePicker
            keyboard
            label="Start date"
            value={this.state.startDate}
            onChange={this.handleStartDateChange}
            onError={console.log}
            //format="yyyy/MM/dd"
            disablePast
          />
        </div>
        <div className="picker">
        <InlineDateTimePicker
          keyboard
          label="End date"
          value={this.state.endDate}
          onChange={this.handleEndDateChange}
          onError={console.log}
          //format="yyyy/MM/dd"
          disablePast
        />
      </div>
          <div className="form-group" style={{textAlign: 'right'}}>
            <button type="submit" onClick={ this.handleSubmit } className="btn btn-primary">Search</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchEvents;
