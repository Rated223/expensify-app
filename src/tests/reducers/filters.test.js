import moment from 'moment';
import { filtersReducer } from '../../reducers';

test('Should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });

  expect(state).toStrictEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('Should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT', sortBy: 'amount' });

  expect(state).toStrictEqual({
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('Should set sortBy to date', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  }

  const state = filtersReducer(currentState, { type: 'SORT_BY_DATE', sortBy: 'date' });

  expect(state).toStrictEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('Should set text filter', () => {
  const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text: 'new filter' });
  expect(state.text).toBe('new filter');
});

test('Should set startDate filter', () => {
  const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate: moment(2500) });
  expect(state.startDate).toStrictEqual(moment(2500));
});

test('Should set endDate filter', () => {
  const state = filtersReducer(undefined, { type: 'SET_END_DATE', endDate: moment(5400) });
  expect(state.endDate).toStrictEqual(moment(5400));
});