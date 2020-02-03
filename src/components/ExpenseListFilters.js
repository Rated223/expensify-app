import 'react-dates/initialize';
import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from "react-dates";
import { filtersActions } from '../actions';
import { ExpensesTotal } from '.'
import 'react-dates/lib/css/_datepicker.css';

export class ExpenseListFilters extends React.Component {

  state = {
    calendarFocused: null
  }

  onTextChange = (e) => {
    this.props.setTextFilter({ text: e.target.value });
  }

  onSortChange = (e) => {
    if (e.target.value === "date") {
      this.props.setSortByDate();
    } else if (e.target.value === "amount") {
      this.props.setSortByAmount();
    }
  }
  
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate({ startDate });
    this.props.setEndDate({ endDate });
  }

  onCalendarFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }))
  }

  render() {
    return (
      <div className="content-container">
        <ExpensesTotal />
        <div className="input-group">
          <div className="input-group__item">
            <input
              className="text-input"
              type="text"
              placeholder="Search expenses"
              value={this.props.filters.text} 
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={this.props.filters.sortBy} 
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker 
              startDate={this.props.filters.startDate}
              startDateId="start-date-id"
              endDate={this.props.filters.endDate}
              endDateId="end-date-id"
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onCalendarFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters
})

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: ({ text }) => dispatch(filtersActions.setTextFilter({ text })),
  setSortByDate: () => dispatch(filtersActions.sortByDate()),
  setSortByAmount: () => dispatch(filtersActions.sortByAmount()),
  setStartDate: ({ startDate }) => dispatch(filtersActions.setStartDate({ startDate })),
  setEndDate: ({ endDate }) => dispatch(filtersActions.setEndDate({ endDate }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);