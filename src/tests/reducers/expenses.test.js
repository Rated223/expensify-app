import { expensesReducer } from '../../reducers';
import expenses from '../fixtures/expenses';

test('Should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toStrictEqual([])
});

test('Should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }
  const state = expensesReducer(expenses, action);
  expect(state).toStrictEqual([ expenses[0], expenses[2] ]);
});

test('Should no remove expenses if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  }
  const state = expensesReducer(expenses, action);
  expect(state).toStrictEqual(expenses);
});

test('Should add an expense', () => {
  const newExpense = {
    id: '4',
      description: 'transport',
      note: '',
      amount: 234,
      createdAt: 0
  }
  const action = {
    type: 'ADD_EXPENSE',
    expense: newExpense
  }

  const state = expensesReducer(expenses, action);
  expect(state).toStrictEqual([ ...expenses, newExpense ]);
});

test('should edit an expense', () => {
  const editExpense = {
    description: 'Food',
    note: '',
    amount: 1200,
    createdAt: 200
  }
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    update: editExpense

  }
  const state = expensesReducer(expenses, action);
  editExpense.id = expenses[1].id;

  expect(state).toStrictEqual([ expenses[0], editExpense, expenses[2] ]);
});

test('should no edit expense if expense not found', () => {
  const editExpense = {
    description: 'Food',
    note: '',
    amount: 1200,
    createdAt: 200
  }
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    update: editExpense
    
  }
  const state = expensesReducer(expenses, action);
  expect(state).toStrictEqual(expenses);
});