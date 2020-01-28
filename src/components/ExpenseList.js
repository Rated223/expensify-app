import React from "react";
import { connect } from "react-redux";
import { ExpenseListItem, ExpensesTotal } from ".";
import { getVisibleExpenses } from '../selectors';

export const ExpenseList = (props) => (
  <div>
    {
      props.expenses.length === 0 ? (
        <p>No expenses</p>
       ) : (
         <div>
          {props.expenses.map((expense) => {
            return <ExpenseListItem key={expense.id} {...expense} />;
          })}
         <ExpensesTotal />
         </div>
       )
    }
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: getVisibleExpenses(state.expenses, state.filters)
  }
};

export default connect(mapStateToProps)(ExpenseList);