import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { expensesActions, filtersActions } from './actions';
import { getVisibleExpenses } from './selectors';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

store.dispatch(expensesActions.addExpense({ description: "Water bill", amount: 1000, createdAt: 200 }));
store.dispatch(expensesActions.addExpense({ description: "Gas bill", amount: 1500, createdAt: 550 }));
store.dispatch(filtersActions.setTextFilter({ text: 'water' }));

setTimeout(() => {
  store.dispatch(filtersActions.setTextFilter({ text: 'bill' }));
}, 3000);

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
