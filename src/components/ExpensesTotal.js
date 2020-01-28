import React from "react";
import { connect } from "react-redux";
import numeral from 'numeral';
import { getVisibleExpenses, getExpensesTotal } from '../selectors';


export const ExpensesTotal = (props) => (
  <div>
    <p>Total: {numeral(props.total).format('$0,0.00')}</p>
  </div>
)

const mapStateToProps = (state) => {
  return {
    total: getExpensesTotal(getVisibleExpenses(state.expenses, state.filters))
  }
}

export default connect(mapStateToProps)(ExpensesTotal);