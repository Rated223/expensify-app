import { createStore, combineReducers } from 'redux';
import { expensesReducer, filtersReducer } from '../reducers';

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    })
  );
  
  return store;
}