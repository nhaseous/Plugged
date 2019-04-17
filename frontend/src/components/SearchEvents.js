import React, { Component } from 'react';
import Input from '@material-ui/core/Input';

class SearchEvents extends Component {
  state = {
    keyword: '',
    city: ''
  };



  handleSubmit = e => {
    e.preventDefault();
    var query = {
      keyword: document.getElementById("keyword").value,
      city: document.getElementById("city").value,
      page: 0
    };
    this.props.searchEvents(query);
  };

  componentDidMount() {

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
          <div className="form-group" style={{textAlign: 'right'}}>
            <button type="submit" onClick={ this.handleSubmit } className="btn btn-primary">Search</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchEvents;
