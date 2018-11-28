import moment from 'moment';

const ENTER_HOME_VIEW  = 'ENTER_HOME_VIEW';
const LEAVE_HOME_VIEW  = 'LEAVE_HOME_VIEW';

const ENTER_PAGE_NOT_FOUND_VIEW = 'ENTER_PAGE_NOT_FOUND_VIEW';
const LEAVE_PAGE_NOT_FOUND_VIEW = 'LEAVE_PAGE_NOT_FOUND_VIEW';

const initialState = {
  currentView:  'home',
  enterTime:    null,
  leaveTime:    null
};

export default function views(state = initialState, action) {
  switch (action.type) {
  case ENTER_HOME_VIEW:    
  case ENTER_PAGE_NOT_FOUND_VIEW:  
    if (state.currentView !== action.currentView) {
      return {
        ...state,
        currentView:  action.currentView,
        enterTime:    action.enterTime,
        leaveTime:    action.leaveTime
      };
    }
    return state;

  case LEAVE_HOME_VIEW:  
  case LEAVE_PAGE_NOT_FOUND_VIEW:  
    if (state.currentView === action.currentView) {
      return {
        ...state,
        currentView:  action.currentView,
        enterTime:    action.enterTime,
        leaveTime:    action.leaveTime
      };
    }
    return state;
  default:
    return state;
  }
}


export function enterHome(time = moment().format()) {
  return {
    type:         ENTER_HOME_VIEW,
    currentView:  'Home',
    enterTime:    time,
    leaveTime:    null
  };
}

export function leaveHome(time = moment().format()) {
  return {
    type:         LEAVE_HOME_VIEW,
    currentView:  'Home',
    enterTime:    null,
    leaveTime:    time
  };
}

export const enterPageNotFound = (time = moment().format()) => {
  return {
    type:         ENTER_PAGE_NOT_FOUND_VIEW,
    currentView:  'PageNotFound',
    enterTime:    time,
    leaveTime:    null
  };
}

export const leavePageNotFound = (time = moment().format()) => {
  return {
    type:         LEAVE_PAGE_NOT_FOUND_VIEW,
    currentView:  'PageNotFound',
    enterTime:    null,
    leaveTime:    time
  };
}