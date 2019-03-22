import React, { Component } from 'react';

const styles = theme => ({

});

class NewPost extends Component {
  state = {
    body: ''
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.body.trim()) {
      this.props.onAddPost(this.state);
      this.handleReset();
    }
  };

  handleReset = () => {
    this.setState({
      title: '',
      body: ''
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <textarea
              cols="19"
              rows="8"
              placeholder="What's on your mind?"
              className="form-control"
              name="body"
              onChange={ this.handleInputChange }
              value={ this.state.body }>
            </textarea>
          </div>
          <div className="form-group" style={{textAlign: 'right'}}>
            <button type="submit" className="btn btn-primary">Post</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewPost;
