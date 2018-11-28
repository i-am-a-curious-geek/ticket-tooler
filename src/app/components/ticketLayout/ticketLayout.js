import React from "react";
import PropTypes from 'prop-types';
import TicketRow from "./ticketRow";

const TicketLayout = ({ 
  dataRows,
  doneTicket, 
  closeTicket, 
  restartTicket
}) => (	
	dataRows.map(row => 
		<div>      
        <TicketRow 
          id={row.id} 
          key={row.id} 
          title={row.title} 
          status={row.status}

          doneTicket={doneTicket} 
          closeTicket={closeTicket} 
          restartTicket={restartTicket} 
        />      
      <hr />  
    </div>
	)
);

TicketLayout.propTypes = {  
	dataRows: PropTypes.arrayOf(
    PropTypes.shape({
      id:      PropTypes.string,
      title:    PropTypes.string,
      status:     PropTypes.string
    })
  ),
  doneTicket: PropTypes.func,
  restartTicket: PropTypes.func,
  closeTicket: PropTypes.func
};

export default TicketLayout;