import 'react-dates/initialize';
import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const now = moment();

class ExpenseForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      amount: props.expense ? +props.expense.amount : '',
      note: props.expense ? props.expense.note : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ''
    }
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
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          className="text-input"
          type="text"
          placeholder="Description"
          value={this.state.description}
          onChange={this.onDescriptionChange}
          autoFocus
        />
        <input
          className="text-input"
          type="text"
          placeholder="Amount"
          value={this.state.amount} 
          onChange={this.onAmountChange}
        />
        <textarea
          className="textarea"
          placeholder="Add a note for yor expense (optional)"
          value={this.state.note}
          onChange={this.onNoteChange}
        ></textarea>
        <div className="form__row-inputs">
          <SingleDatePicker 
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onCalendarFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
            openDirection="up"
          />
          <button className="button">Save expense</button>
        </div>
      </form>
    )
  }
} 

export default ExpenseForm;