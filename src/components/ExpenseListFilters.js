import 'react-dates/initialize';
import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from "react-dates";
import { filtersActions } from '../actions';
import 'react-dates/lib/css/_datepicker.css';

class ExpenseListFilters extends React.Component {

  state = {
    calendarFocused: null
  }

  onDateChange = ({ startDate, endDate }) => {
    this.props.dispatch(filtersActions.setStartDate({ startDate }));
    this.props.dispatch(filtersActions.setEndDate({ endDate }));
  }

  onCalendarFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }))
  }

  render() {
    return (
      <div>
        <input 
          type="text" 
          value={this.props.filters.text} 
          onChange={(e) => {
            console.log(e.target.value);
            this.props.dispatch(filtersActions.setTextFilter({ text: e.target.value }));
          }}
        />
        <select 
          value={this.props.filters.sortBy} 
          onChange={(e) => {
            if (e.target.value === "date") {
              this.props.dispatch(filtersActions.sortByDate());
            } else if (e.target.value === "amount") {
              this.props.dispatch(filtersActions.sortByAmount());
            }
          }}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker 
          startDate={this.props.filters.startDate}
          startDateId="start-date-id"
          endDate={this.props.filters.endDate}
          endDateId="end-date-id"
          onDatesChange={this.onDateChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onCalendarFocusChange}
          showClearDates={true}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
    
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

export default connect(mapStateToProps)(ExpenseListFilters);