import React, { Component } from "react";
import PropTypes            from 'prop-types';
import { Col } from 'reactstrap';

export const TicketRow = ({ 
	id, 
	title, 
	status,
	doneTicket, 
	closeTicket, 
	restartTicket
}) => (	
	<div className="row">
		<Col xs={12} md={2}><b className="card__title">{id}</b></Col> 
		<Col xs={12} md={4}><span className="card__title">{title}</span></Col>  	 	
		<Col xs={12} md={3}>
		{(status === "IN PROGRESS") ? <span className="label-warning">⬤ </span> : ((status === "DONE") ? <span className="label-success">⬤ </span> : <span className="label-default">⬤ </span>)}
		{status}
		</Col> 
		<Col xs={12} md={3}> 
  		{(status === "IN PROGRESS") ? <table className="actionTable"><tbody><tr><td><button value={id} className="btn btn-success" onClick={doneTicket}>✔<small> Done</small></button></td><td><button value={id} className="btn btn-default" onClick={closeTicket}>✘<small> Close</small></button></td></tr></tbody></table> : ((status === "DONE") ? <table className="actionTable"><tbody><tr><td><button value={id} className="btn btn-warning" onClick={restartTicket}>⚠<small> Not Fixed</small></button></td><td><button value={id} className="btn btn-default" onClick={closeTicket}>✘<small> Close</small></button></td></tr></tbody></table> : <table className="actionTable"><tbody><tr><td colSpan={2}>🔒</td></tr></tbody></table>)}			
		</Col>	   
	</div>			
);

TicketRow.propTypes = {	
    id:      PropTypes.string,
    title:    PropTypes.string,
    status:     PropTypes.string,    
    doneTicket: PropTypes.func,
    restartTicket: PropTypes.func,
    closeTicket: PropTypes.func
};

export default TicketRow;