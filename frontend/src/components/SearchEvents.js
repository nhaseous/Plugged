import React, { Component, useState } from 'react';
import Input from '@material-ui/core/Input';
import { InlineDateTimePicker } from "material-ui-pickers";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

class SearchEvents extends Component {

  state = {
    startDate: null,
    endDate: null,
    genre: "KZFzniwnSyZfZ7v7nJ"
  };

  handleSubmit = e => {
    e.preventDefault();
    var query = {
      keyword: document.getElementById("keyword").value,
      city: document.getElementById("city").value,
      page: 0,
      startDateTime: this.state.startDate,
      endDateTime: this.state.endDate,
      classificationId: this.state.genre
    };
    if (query.startDateTime) {
      query.startDateTime = query.startDateTime.toISOString().split('.')[0]+"Z";
    }
    if (query.endDateTime) {
      query.endDateTime = query.endDateTime.toISOString().split('.')[0]+"Z";
    }
    this.props.searchEvents(query);
  };

  componentDidMount() {

  }

  handleGenreChange = event => {
    this.setState({ genre: event.target.value });
  };

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
      <FormControl className="formControl" style={{minWidth: "100px"}}>
        <InputLabel htmlFor="genre">Genre</InputLabel>
        <Select
          value={this.state.genre}
          onChange={this.handleGenreChange}
          inputProps={{
            name: 'genre',
            id: 'genre',
          }}
        >
          <MenuItem value="KZFzniwnSyZfZ7v7nJ">
            All Genres
          </MenuItem>
          <MenuItem value={"KnvZfZ7vAvv"}>Alternative</MenuItem>
          <MenuItem value={"KnvZfZ7vAvd"}>Blues</MenuItem>
          <MenuItem value={"KnvZfZ7vAeJ"}>Classical</MenuItem>
          <MenuItem value={"KnvZfZ7vAv6"}>Country</MenuItem>
          <MenuItem value={"KnvZfZ7vAvF"}>Dance/Electronic</MenuItem>
          <MenuItem value={"KnvZfZ7vAva"}>Folk</MenuItem>
          <MenuItem value={"KnvZfZ7vAv1"}>Hip-Hop/Rap</MenuItem>
          <MenuItem value={"KnvZfZ7vAvE"}>Jazz</MenuItem>
          <MenuItem value={"KnvZfZ7vAev"}>Pop</MenuItem>
          <MenuItem value={"KnvZfZ7vAee"}>R&B</MenuItem>
          <MenuItem value={"KnvZfZ7vAeA"}>Rock</MenuItem>

        </Select>
      </FormControl>
          <div className="form-group" style={{textAlign: 'right'}}>
            <button type="submit" onClick={ this.handleSubmit } className="btn btn-primary">Search</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchEvents;
