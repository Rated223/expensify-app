import React from 'react';
import { connect } from "react-redux";
import { expensesActions } from "../actions";

const ExpenseListItem = ({ description, amount, createdAt, id, dispatch }) => (
  <div>
    <h3>{description}</h3>
    <p>{amount} - {createdAt}</p>
    <button onClick={() => dispatch(expensesActions.removeExpense({ id }))}>
      Remove
    </button>
  </div>
);

export default connect()(ExpenseListItem);