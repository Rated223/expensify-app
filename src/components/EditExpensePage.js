import React from 'react';
import { connect } from 'react-redux';
import { ExpenseForm } from ".";
import { expensesActions } from "../actions";

const EditExpensePage = (props) => {
  return (
    <div>
      <ExpenseForm 
        expense={props.expense}
        onSubmit={(expense) => {
          props.dispatch(expensesActions.editExpense({ id: props.match.params.id, update: expense }))
          props.history.push('/');
        }}
      />
      <button onClick={() => {
          props.dispatch(expensesActions.removeExpense({ id: props.match.params.id }));
          props.history.push('/');
      }}>
        Remove
      </button>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  }
}

export default connect(mapStateToProps)(EditExpensePage);
