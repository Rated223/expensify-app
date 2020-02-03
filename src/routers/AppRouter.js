import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {
  ExpenseDashboardPage,
  AddExpensePage,
  EditExpensePage,
  NotFoundPage,
  LoginPage
} from '../components';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} exact={true} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export {AppRouter as default, history};
