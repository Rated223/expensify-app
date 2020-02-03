import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import { getVisibleExpenses, getExpensesTotal } from '../selectors';


export const ExpensesTotal = (props) => {
  const expenseWord = props.count === 1 ? 'expense': 'expenses';

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{props.count}</span> {expenseWord} totalling <span>{numeral(props.total).format('$0,0.00')}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    total: getExpensesTotal(getVisibleExpenses(state.expenses, state.filters)),
    count: getVisibleExpenses(state.expenses, state.filters).length
  }
}

export default connect(mapStateToProps)(ExpensesTotal);