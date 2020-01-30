import React from 'react';
import { connect } from 'react-redux';
import { ExpenseForm } from '.';
import { expensesActions } from '../actions';

export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <p>Add expense</p>
        <ExpenseForm
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(expensesActions.startAddExpense(expense))
})

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
