import React from 'react';

const styles = {
  borderBottom: '2px solid #eee',
  background: '#fafafa',
  margin: '.75rem auto',
  padding: '.6rem 1rem',
  maxWidth: '750px',
  borderRadius: '10px'
};

export default ({ post: { body, _id }, onDelete }) => {
  return (
    <div style={ styles }>
      <p>{ body }</p>
      <div style={{textAlign: 'right'}}>
        <button className="btn btn-danger" type="button" onClick={() => onDelete(_id)}>
          Remove
        </button>
      </div>
    </div>
  );
};
