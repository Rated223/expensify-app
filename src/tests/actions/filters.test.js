import moment from 'moment';
import { filtersActions } from "../../actions";

test('Should generate set start date action object', () => {
  const action = filtersActions.setStartDate({ startDate: moment(0) });

  expect(action).toStrictEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
  })
});

test('Should generate set end date action object', () => {
  const action = filtersActions.setEndDate({ endDate: moment(1) });

  expect(action).toStrictEqual({
    type: 'SET_END_DATE',
    endDate: moment(1)
  })
});

test('Should generate set text action object', () => {
  const action = filtersActions.setTextFilter({ text: 'test filter' });
  
  expect(action).toStrictEqual({
    type: 'SET_TEXT_FILTER',
    text: 'test filter'
  })
});

test('Should generate set text action object with default text', () => {
  const action = filtersActions.setTextFilter();

  expect(action).toStrictEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  })
});

test('Should generate sort by amount action object', () => {
  const action = filtersActions.sortByAmount();

  expect(action).toStrictEqual({
    type: 'SORT_BY_AMOUNT',
    sortBy: 'amount'
  })
});

test('Should generate sort by date action object', () => {
  const action = filtersActions.sortByDate();
  
  expect(action).toStrictEqual({
    type: 'SORT_BY_DATE',
    sortBy: 'date'
  })
});