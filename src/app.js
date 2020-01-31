import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { expensesActions, filtersActions } from './actions';
import { getVisibleExpenses } from './selectors';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import './firebase/firebase';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(expensesActions.startSetExpenses())
.then(() => {
  ReactDOM.render(jsx, document.getElementById('app'));
})

