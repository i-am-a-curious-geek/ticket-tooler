import moment               from 'moment';

import json from "api/tickets.json";
import "text-encoding";

const REQUEST_TICKET_DATA   = 'REQUEST_TICKET_DATA';
const RECEIVED_TICKET_DATA  = 'RECEIVED_TICKET_DATA';
const ERROR_TICKET_DATA     = 'ERROR_TICKET_DATA';

const SUBMIT_NEW_TICKET = 'SUBMIT_NEW_TICKET'
const DONE_NEW_TICKET = "DONE_NEW_TICKET";
const CLOSE_NEW_TICKET = "CLOSE_NEW_TICKET";
const RESTART_NEW_TICKET = "RESTART_NEW_TICKET";

var initialState = {
  isFetching: false,
  data:       [],
  time:       null
};

const initialData = initialState.data;
const toCache = true;

export default function tickets(state = initialState, action) {
  switch (action.type) {    
    case 'REQUEST_TICKET_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        time:       action.time
      };
    // all synchronous calls start from here
    case 'SUBMIT_NEW_TICKET':    
    case "DONE_NEW_TICKET":
    case "CLOSE_NEW_TICKET":
    case "RESTART_NEW_TICKET":
    case 'RECEIVED_TICKET_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        data:     [...action.data],
        time:       action.time
      };   
    case 'ERROR_TICKET_DATA':
      return {
        ...state,
        isFetching: action.isFetching,
        time:       action.time
      };
    default:
      return state;
    }
}

// ============================ ASYNCHRONOUS CALLS =================================== //
function requestTicketData(time = moment().format()) {
  return {
    type:       REQUEST_TICKET_DATA,
    isFetching: true,
    time
  };
}
function receivedTicketData(data, time = moment().format()) {
  return {
    type:       RECEIVED_TICKET_DATA,
    isFetching: false,
    data,
    time
  };
}

function errorTicketData(time = moment().format()) {
  return {
    type:       ERROR_TICKET_DATA,
    isFetching: false,
    time
  };
}

function fetchTicketData() { // CALLING AN API 
  return dispatch => {
    dispatch(requestTicketData()) 
      fetch(`${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}${json}`, {   
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })      
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }/* else {
          const error = new Error(response.statusText);
          error.response = response;
          
          return Promise.reject(error);
        }*/
      })    
      .then(response => {        
        return response.body
      })
      .then(body => body.getReader())
      .then(reader => reader.read())
      .then(function({ done, value }) {         
        return value
      })
      .then(uint8array => {
        var text = new TextDecoder("utf-8").decode(uint8array);        
        text = (text).replace('export default "', '');
        text = (text).replace(']"', ']');
        text = (text).replace(/\\r|\\n|\\t|\\/g, '');
        
        return JSON.parse(text)
      }).then(data => {
        return new Promise(
          resolve => {  
            setTimeout(() => {
              resolve([...data])
            }, 2000)                                  
          }
        )
      })
      .then(data => dispatch(receivedTicketData(data)))  
      .catch(error => dispatch(errorTicketData(error)))                             
  }
}

function shouldFetchTicketData(state) {
  const ticketsStore = state.tickets; 
  if(toCache) {
    if(initialData == ticketsStore.data) {
      console.log("fetching for initialisation");
      if(ticketsStore.isFetching) {        
        return false;
      } else {        
        return true;
      }
    } else {    
      // no need to anything
      console.log(ticketsStore.data);
      console.log("Cache stores the prevState and nextState");
    }
  } else {
    console.log("fetching for initialisation");
    if(ticketsStore.isFetching) {        
      return false;
    } else {        
      return true;
    }
  }
}

export function fetchTicketDataIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchTicketData(getState())) {
      return dispatch(fetchTicketData());
    }
  };
}

// ============================ SYNCHRONOUS CALLS =================================== //
export function submitTicket(data, time = moment().format()) {  
  initialState.data = data;
  return {
    type:       SUBMIT_NEW_TICKET,
    isFetching: false,
    data,
    time      
  }      
}

export function doneTicket(data, time = moment().format()) {  
  initialState.data = data;
  return {
    type:       DONE_NEW_TICKET,
    isFetching: false,
    data,
    time      
  }      
}

export function closeTicket(data, time = moment().format()) {  
  initialState.data = data;
  return {
    type:       CLOSE_NEW_TICKET,
    isFetching: false,
    data,
    time      
  }      
}

export function restartTicket(data, time = moment().format()) {  
  initialState.data = data;
  return {
    type:       RESTART_NEW_TICKET,
    isFetching: false,
    data,
    time      
  }      
}