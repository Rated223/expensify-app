import moment from 'moment';
import expenses from '../fixtures/expenses';
import { getVisibleExpenses } from '../../selectors';

test('Should filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const result = getVisibleExpenses(expenses, filters);

  expect(result).toStrictEqual([ expenses[2], expenses[1] ]);
});

test('Shound filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  }
  const result = getVisibleExpenses(expenses, filters);

  expect(result).toStrictEqual([ expenses[2], expenses[0] ]);
});

test('Should filter by endDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0)
  }
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toStrictEqual([ expenses[0], expenses[1] ]);
});

test('Should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toStrictEqual([ expenses[2], expenses[0], expenses[1] ])
});

test('Should sort by amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toStrictEqual([ expenses[2], expenses[1], expenses[0] ])
})