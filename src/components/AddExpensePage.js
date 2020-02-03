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
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(expensesActions.startAddExpense(expense))
})

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
