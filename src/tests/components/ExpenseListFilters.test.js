import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, setSortByDate, setSortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  setSortByDate = jest.fn();
  setSortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();

  wrapper = shallow(<ExpenseListFilters 
    filters={filters}
    setTextFilter={setTextFilter}
    setSortByDate={setSortByDate}
    setSortByAmount={setSortByAmount}
    setStartDate={setStartDate}
    setEndDate={setEndDate}
  />);
});

test('Should render ExpenseListFilters correclty', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseListFilter with alter filters', () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('Should handle text change', () => {
  const e = { target: { value: "new text" } };
  wrapper.find('input').simulate('change', e);
  expect(setTextFilter).toHaveBeenLastCalledWith({text: e.target.value});
});

test('Should sort by date', () => {
  wrapper.setProps({
    filters: altFilters
  });
  const e = { target: { value: "date" } };
  wrapper.find('select').simulate('change', e);
  expect(setSortByDate).toBeCalledTimes(1);
});

test('Should sort by amount', () => {
  const e = { target: { value: "amount" } };
  wrapper.find('select').simulate('change', e);
  expect(setSortByAmount).toBeCalledTimes(1);
});

test('Should handle date changes', () => {
  const dates = {
    startDate: 1000,
    endDate: 2000
  }
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')(dates);
  expect(setStartDate).toHaveBeenLastCalledWith({ startDate: dates.startDate });
  expect(setEndDate).toHaveBeenLastCalledWith({ endDate: dates.endDate });
});

test('Should handle date focus changes', () => {
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')('endDate');
  expect(wrapper.state('calendarFocused')).toBe('endDate');
});