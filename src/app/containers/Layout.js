import React, {
  PureComponent
}                             from 'react';
import PropTypes              from 'prop-types';
import {
  Header,
  TicketLayout,
  AnimatedView
}                             from '../components';
import { Card, CardBody, Col } from 'reactstrap';
import { connect }              from 'react-redux';
import {
  bindActionCreators,
  compose
}                               from 'redux';
import { withRouter }           from 'react-router';
import * as actions           from '../redux/actions';

import loading from 'img/loading.gif';

var header = (<div className="row">                                 
                  <Col xs={12} md={2}>
                    <b className="card__title">ID</b>    
                  </Col>
                  <Col xs={12} md={4}>
                    <b className="card__title">TITLE</b>    
                  </Col>
                  <Col xs={12} md={3}>
                    <b className="card__title">STATUS</b>    
                  </Col> 
                  <Col xs={12} md={3}>
                    <b className="card__title">ACTION</b>    
                  </Col> 
                  <Col xs={12} md={3}></Col> 
                </div>);

var loadingSignal = (<div className="row">
                          <Col xs={12} md={1}></Col> 
                          <Col xs={12} md={10}>  
                            <Card>
                              <CardBody>            
                                  {header}
                                  <hr />
                                  <div className="row">
                                     <div style={{width: "100%", margin: "20px auto", textAlign: "center"}}>
                                        <h3 className="page-title">Loading</h3>
                                        <img src={loading} style={{height: 50, width: 50}} alt="Loading..." /> 
                                      </div>
                                  </div>                        
                              </CardBody>  
                            </Card>
                          </Col>                                      
                          <Col xs={12} md={1}></Col> 
                        </div>);

class Layout extends PureComponent {  
  
  constructor() {
    super();
    
    this.timeoutToClose = null; 
  }

  static propTypes = {  
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    ticketDataIsFetching:  PropTypes.bool,
    tickets:            PropTypes.arrayOf(
      PropTypes.shape({
        id:      PropTypes.string,
        title:    PropTypes.string,
        status:     PropTypes.string
      })
    ),
    
    actions: PropTypes.shape({
      enterHome: PropTypes.func,
      leaveHome: PropTypes.func,      
            
      fetchTicketDataIfNeeded:     PropTypes.func,
      submitTicket: PropTypes.func,
      doneTicket: PropTypes.func,
      closeTicket: PropTypes.func,
      restartTicket: PropTypes.func
    })
  };

  state = {
    tickets: [],
    newTicketTitle: ""
  };

  componentWillMount() {
    const { actions: { enterHome } } = this.props;
    enterHome();
  }

  componentDidMount() {
    const { actions: { fetchTicketDataIfNeeded } } = this.props;
    const { tickets } = this.props;    
    fetchTicketDataIfNeeded();      
  }

  componentWillUnmount() {
    const { actions: { leaveHome } } = this.props;
    leaveHome();
  }  

  render() {    
    const { 
      tickets,
      ticketDataIsFetching,
      fetchTicketDataIfNeeded      
    } = this.props;
    
    if(tickets.length > 0) {      
      this.setState({ 
        tickets: tickets
      });
    }

    return (
      <div className="layout">
        <Header 
          submitTicket={this.handleSubmitTicket}
          ticketDataIsFetching={ticketDataIsFetching}
          handleNewTicketTitle={this.handleNewTicketTitle}
          newTicketTitle={this.state.newTicketTitle}
        />          
        <div className="container__wrap">
          <div className="container">              
            <div className="row help-block"></div>
            <AnimatedView> 
            { ticketDataIsFetching ? loadingSignal :   <div className="row">
                                                          <Col xs={12} md={1}></Col> 
                                                          <Col xs={12} md={10}>  
                                                            <Card>
                                                              <CardBody>            
                                                                  {header}
                                                                  <hr />
                                                                  <TicketLayout 
                                                                    dataRows={this.state.tickets}

                                                                    doneTicket={this.handleChangeStatusToDone}
                                                                    closeTicket={this.handleCloseOffTicket}
                                                                    restartTicket={this.handleCreateTicket}
                                                                  />                                         
                                                              </CardBody>  
                                                            </Card>
                                                          </Col>
                                                          <Col xs={12} md={1}></Col>             
                                                        </div>}   
            </AnimatedView>                         
          </div>
        </div>
      </div>
    );
  }    



  
  handleChangeStatusToDone = (event) => {  
    const { actions: { fetchTicketDataIfNeeded } } = this.props;
    const { tickets } = this.props;

    let ticketId = parseInt(event.target.value)-1;    
    tickets[ticketId]["status"] = "DONE"; 
    let newData = tickets;

    const { actions: { doneTicket } } = this.props;
    doneTicket(newData); 

    Object.assign({}, this.state.tickets, newData) 
    fetchTicketDataIfNeeded();

    this.timeoutToClose = setTimeout(() => {
      this.closeOffTicketId(ticketId);
    }, 5000);
  }

  
  closeOffTicketId(ticketId) {   
    const { actions: { fetchTicketDataIfNeeded } } = this.props;
    const { tickets } = this.props;
     
    tickets[ticketId]["status"] = "CLOSED"; 
    let newData = tickets;  

    const { actions: { closeTicket } } = this.props;
    closeTicket(newData); 

    Object.assign({}, this.state.tickets, newData) 
    fetchTicketDataIfNeeded();

    if(this.timeoutToClose) {
      clearTimeout(this.timeoutToClose);
      this.timeoutToClose = null;
    }
  }

  
  handleCloseOffTicket = (event) => {      
    const { actions: { fetchTicketDataIfNeeded } } = this.props;
    const { tickets } = this.props;

    let ticketId = parseInt(event.target.value)-1;    
    tickets[ticketId]["status"] = "CLOSED"; 
    let newData = tickets;  
    const { actions: { closeTicket } } = this.props;
    closeTicket(newData); 
    Object.assign({}, this.state.tickets, newData);     
    
    fetchTicketDataIfNeeded();
  }

  
  handleCreateTicket = (event) => {   
    const { actions: { fetchTicketDataIfNeeded } } = this.props;
    const { tickets } = this.props;

    if(this.timeoutToClose) {
      clearTimeout(this.timeoutToClose);
      this.timeoutToClose = null;
    }

    let ticketId = parseInt(event.target.value)-1;    
    tickets[ticketId]["status"] = "IN PROGRESS"; 
    let newData = this.props.tickets;  
    
    const { actions: { restartTicket } } = this.props;
    restartTicket(newData); 

    Object.assign({}, this.state.tickets, newData); 

    fetchTicketDataIfNeeded();
  }


  handleNewTicketTitle = (event) => {  
    if (event) {
      event.preventDefault();
    }

    this.setState({
        newTicketTitle: event.target.value
    });
  }

  handleSubmitTicket = (event) => {  
    if (event) {
      event.preventDefault();
    }

    const { actions: { fetchTicketDataIfNeeded } } = this.props;

    if(this.timeoutToClose) {
      clearTimeout(this.timeoutToClose);
      this.timeoutToClose = null;
    }

    if(String(this.state.newTicketTitle).trim().length == 0) { 
    } else {
      let ticketId = parseInt(this.props.tickets.length + 1);      
      let newTicket = [{
        "id": String(ticketId),
        "status": "IN PROGRESS",
        "title": String(this.state.newTicketTitle)
      }];      
      let newData = this.props.tickets.concat(newTicket);
      const { actions: { submitTicket } } = this.props;
      submitTicket(newData);    
      Object.assign({}, this.state.tickets, newData); 
      fetchTicketDataIfNeeded();    

      this.setState({
        newTicketTitle: ''
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {  
    currentView:  state.views.currentView,    

    ticketDataIsFetching:    state.tickets.isFetching,
    tickets:              state.tickets.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        enterHome: actions.enterHome,
        leaveHome: actions.leaveHome,       

        fetchTicketDataIfNeeded: actions.fetchTicketDataIfNeeded,
        submitTicket: actions.submitTicket,
        doneTicket: actions.doneTicket,
        closeTicket: actions.closeTicket,
        restartTicket: actions.restartTicket
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);