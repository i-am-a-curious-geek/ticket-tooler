import React        from 'react';
import PropTypes    from 'prop-types';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';

const Header = ({ 
  submitTicket,
  handleNewTicketTitle,
  newTicketTitle,
  ticketDataIsFetching
}) => (
  <div className="topbar">
    <div className="topbar__wrapper">
      <div className="topbar__left">           
        <Link className="topbar__logo" to="/" />                
      </div>
      <div className="topbar__right">
      <input 
        type="text" 
        value={newTicketTitle}
        placeholder="Enter Ticket Title..." 
        className="form-control ticket-title-add" 
        disabled={ticketDataIsFetching}                           
        onChange={handleNewTicketTitle}                         
      />                
      <button 
        className="btn create-btn btn-info" 
        disabled={ticketDataIsFetching}
        onClick={submitTicket}
      >
        <svg className="icon icon-plus">
          <use xlinkHref="#icon-plus"></use>
        </svg> 
        <span> <small>Create</small></span>  
      </button>     
      </div>  
    </div>      
  </div>
);


Header.propTypes = {
  submitTicket: PropTypes.func,
  handleNewTicketTitle: PropTypes.func,
  newTicketTitle: PropTypes.string,
  ticketDataIsFetching: PropTypes.bool
}

export default Header;