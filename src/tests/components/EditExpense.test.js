import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';
import { ExpenseForm } from '../../components';

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<EditExpensePage editExpense={editExpense} removeExpense={removeExpense} history={history} expense={expenses[0]}/>)
})

test('Should render Editpage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should edit the expense', () => {
  const newExpense = expenses[0];
  newExpense.description = "Newwww description";
  wrapper.find('ExpenseForm').prop('onSubmit')(newExpense);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith({ id: newExpense.id, expense: newExpense });
});

test('Should remove the expense', () => {
  wrapper.find('button').prop('onClick')();
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[0].id });
})