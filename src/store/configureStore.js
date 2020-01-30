import { createStore, combineReducers, applyMiddleware } from 'redux';
import { expensesReducer, filtersReducer } from '../reducers';
import thunk from 'redux-thunk';

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }),
    applyMiddleware(thunk)
  );
  
  return store;
}