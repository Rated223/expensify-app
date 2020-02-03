import { createStore, combineReducers, applyMiddleware } from 'redux';
import { expensesReducer, filtersReducer, authReducer } from '../reducers';
import thunk from 'redux-thunk';

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
      auth: authReducer
    }),
    applyMiddleware(thunk)
  );
  
  return store;
}