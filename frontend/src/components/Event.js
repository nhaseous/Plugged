import React from 'react';

export default ({event: { name, dates, _embedded } }) => {
  return (
    <div>
      <a href="#" className="list-group-item" style={{color: "#555", padding: "10px 10px", textDecoration: "none"}}>
        <h4 className="list-group-item-heading" style={{color: "black"}}>{name}</h4>
        <p className="list-group-item-text" style={{marginBottom: "0px"}}>{dates.start.localDate}</p>
        <p className="venue">{_embedded.venues[0].name} in {_embedded.venues[0].city.name}</p>
      </a>
    </div>
  );
};
