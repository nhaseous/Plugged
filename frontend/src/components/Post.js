import React from 'react';
import axios from 'axios';
import Time from 'react-time'

const styles = {
  borderBottom: '2px solid #eee',
  background: '#fafafa',
  margin: '.75rem auto',
  padding: '0.5rem 0.5rem',
  maxWidth: '750px',
  borderRadius: '10px'
};

export default ({ user: {name, avatar}, post: { sender, date, body, _id }, onDelete }) => {
  return (
    <div style={ styles }>
      <img src={ avatar } alt="avatar" height="42" width="42" style={{marginRight: 5, marginBottom: 5}}></img>
      <strong>{ name }</strong>
      <p>{ body }</p>
      <div style={{textAlign: 'right'}}><Time value={date} format="MM/DD/YYYY" /></div>
      <div style={{textAlign: 'right'}}>
        <button className="btn btn-danger" type="button" onClick={() => onDelete(_id)}>
          Remove
        </button>
      </div>
    </div>
  );
};
