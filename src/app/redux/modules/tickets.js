import moment               from 'moment';

const REQUEST_TICKET_DATA   = 'REQUEST_TICKET_DATA';
const RECEIVED_TICKET_DATA  = 'RECEIVED_TICKET_DATA';
const ERROR_TICKET_DATA     = 'ERROR_TICKET_DATA';

const SUBMIT_NEW_TICKET = 'SUBMIT_NEW_TICKET'
const DONE_NEW_TICKET = "DONE_NEW_TICKET";
const CLOSE_NEW_TICKET = "CLOSE_NEW_TICKET";
const RESTART_NEW_TICKET = "RESTART_NEW_TICKET";

var initialState = {
  isFetching: false,
  data:       [  
                {"id":"1","title": "TRINITY BLOOD","status":"IN PROGRESS"},
                {"id":"2","title": "THE DARK AGES","status":"IN PROGRESS"},
                {"id":"3","title": "ARMAGEGGON","status":"CLOSED"},
                {"id":"4","title": "NOAH'S ARK","status":"IN PROGRESS"}
              ],
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


function errorTicketData(time = moment().format()) {
  return {
    type:       ERROR_TICKET_DATA,
    isFetching: false,
    time
  };
}

function fetchTicketData() { 
  return dispatch => {
    dispatch(requestTicketData())
    return fetch("http://localhost:3000/api/data/tickets.json", {
      "credentials": "same-origin",
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "method": "POST"
      }
    })
    .then(response => // .then(response => response.json())
      /*
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        
        return Promise.reject(error);
      }
      */
      new Promise(
        resolve => {
          setTimeout(function() {
            resolve([...initialState.data])
          }, 3000)        
        }
      )
    )        
    .then(data => dispatch(receivedTicketData(data)))
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