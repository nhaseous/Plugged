import React from 'react';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

export default ({user: { avatar }, event: { name, dates, venue, city, id }, addEvent, clearEvent, status }) => {
  return (
    <div>
      <a href="#" className="list-group-item" style={{color: "#555", padding: "10px 10px", textDecoration: "none"}}>
        <h4 className="list-group-item-heading" style={{color: "black"}}>{name}</h4>
        <p className="list-group-item-text" style={{marginBottom: "0px"}}>{dates}</p>
        <p className="venue">{venue} in {city}</p>
      </a>
      <ExpansionPanel style={{marginTop: 0, border: "none"}}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className="column">
          { status ?
            <Chip
            avatar={<Avatar alt="me" src={avatar} />}
            label={status ? `I'm ${status.status}` : ''}
            onDelete={() => clearEvent(id)}
            className="chip"
            variant="outlined"
            /> : ''
          }
        </div>
        </ExpansionPanelSummary>

        <Divider />
        <ExpansionPanelActions>
          <Button size="small" color="primary" disabled={ status ? (status.status === 'going') : false } onClick={() => addEvent({event: { name: name, date: dates, venue: venue, city: city, id: id }, status: 'going'})} style={{marginRight: "auto"}}>I'm going</Button>
          <Button size="small" disabled={ status ? (status.status === 'interested') : false } onClick={() => addEvent({event: { name: name, date: dates, venue: venue, city: city, id: id }, status: 'interested'})}>Interested</Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
};
