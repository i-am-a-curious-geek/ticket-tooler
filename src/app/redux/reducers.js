import { routerReducer }    from 'react-router-redux';
import { combineReducers }  from 'redux';
import tickets 				from './modules/tickets';
import views                from './modules/views';

export const reducers = {    
  tickets,
  views
};

export default combineReducers({
  ...reducers,
  routing: routerReducer
});
