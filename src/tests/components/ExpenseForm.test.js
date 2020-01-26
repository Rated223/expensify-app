import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseForm } from '../../components';
import expenses from "../fixtures/expenses";

test('Should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
})

test('Should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('Should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });

  expect(wrapper.state('error')).toBe('Please provide description and amount');
  expect(wrapper).toMatchSnapshot();
});

test('Should set description on input change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = 'New description';
  
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });

  expect(wrapper.state('description')).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test('Should set note on textarea change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = 'New note';
  
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });

  expect(wrapper.state('note')).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test('Should set amount on input change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = '23.55';
  
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });

  expect(wrapper.state('amount')).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test('Should not set amount on input change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = '23.5511';
  
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });

  expect(wrapper.state('amount')).toBe('');
  expect(wrapper).toMatchSnapshot();
});

test('Should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });

  expect(wrapper.state('error')).toBe('');
  delete expenses[0].id;
  expect(onSubmitSpy).toHaveBeenLastCalledWith(expenses[0]);
});

test('Should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);

  expect(wrapper.state('createdAt')).toStrictEqual(now);
});

test('Should set calendar focus on change', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused: true });

  expect(wrapper.state('calendarFocused')).toBe(true);
});