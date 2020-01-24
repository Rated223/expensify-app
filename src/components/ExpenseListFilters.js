import React from 'react';
import { connect } from 'react-redux';
import { filtersActions } from '../actions';

const ExpenseListFilters = (props) => (
  <div>
    <input 
      type="text" 
      value={props.filters.text} 
      onChange={(e) => {
        console.log(e.target.value);
        props.dispatch(filtersActions.setTextFilter({ text: e.target.value }));
      }}
    />
    <select 
      value={props.filters.sortBy} 
      onChange={(e) => {
        if (e.target.value === "date") {
          props.dispatch(filtersActions.sortByDate());
        } else if (e.target.value === "amount") {
          props.dispatch(filtersActions.sortByAmount());
        }
      }}
    >
      <option value="date">Date</option>
      <option value="amount">Amount</option>
    </select>
  </div>
);

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

export default connect(mapStateToProps)(ExpenseListFilters);