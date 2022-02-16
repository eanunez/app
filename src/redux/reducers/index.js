import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import ErrFunction from './errors';
import getData from './home';


const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  errors: ErrFunction,
  getData: getData,
});

export default createRootReducer;