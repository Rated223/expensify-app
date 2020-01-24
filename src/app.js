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

store.dispatch(expensesActions.addExpense({ description: "Gas bill", amount: 1500, createdAt: 870 }));
store.dispatch(expensesActions.addExpense({ description: "Water bill", amount: 1700, createdAt: 200 }));
store.dispatch(expensesActions.addExpense({ description: "Rent", amount: 10950, createdAt:  550}));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
