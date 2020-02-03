import React from 'react';
import { connect } from 'react-redux';
import { ExpenseForm } from ".";
import { expensesActions } from "../actions";

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startEditExpense({ id: this.props.expense.id, expense })
    this.props.history.push('/');
  }

  onClick = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id })
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <ExpenseForm 
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onClick}>
          Remove
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  }
}

const mapDispatchToProps = (dispatch) => ({
  startEditExpense: ({ id, expense }) => dispatch(expensesActions.startEditExpense({ id, update: expense })),
  startRemoveExpense: ({ id }) => dispatch(expensesActions.startRemoveExpense({ id }))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
