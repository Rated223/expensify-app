import 'react-dates/initialize';
import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const now = moment();
console.log('now', now.format('MMM Do YYYY'));

class ExpenseForm extends React.Component {
  state = {
    description: '',
    amount: '',
    note: '',
    createdAt: moment(),
    calendarFocused: false,
    error: ''
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  }

  onNoteChange =  (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  }
  
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  }

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }))
    }
  }

  onCalendarFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: 'Please provide description and amount' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        description: this.state.description,
        amount: +this.state.amount,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note

      })
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Description"
            value={this.state.description}
            onChange={this.onDescriptionChange}
            autoFocus
          />
          <input
            type="text"
            placeholder="Amount"
            value={this.state.amount} 
            onChange={this.onAmountChange}
          />
          <SingleDatePicker 
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onCalendarFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add a note for yor expense (optional)"
            value={this.state.notes}
            onChange={this.onNoteChange}
          ></textarea>
          <button>Add expense</button>
        </form>
      </div>
    )
  }
} 

export default ExpenseForm;