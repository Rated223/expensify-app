import React from 'react';
import { connect } from 'react-redux';
import { ExpenseForm } from '.';
import { expensesActions } from '../actions';

const AddExpensePage = (props) => (
  <div>
    <p>Add expense</p>
    <ExpenseForm
      onSubmit={(expense) => {
        props.dispatch(expensesActions.addExpense(expense));
        props.history.push('/');
      }}
    />
  </div>
);

export default connect()(AddExpensePage);
