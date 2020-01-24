const setTextFilter = ({ text = '' } = {}) => ({
  type: 'SET_TEXT_FILTER',
  text
});

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
  sortBy: 'amount'
});

const sortByDate = () => ({
  type: 'SORT_BY_DATE',
  sortBy: 'date'
});

const setStartDate = ({ startDate = undefined } = {}) => ({
  type: 'SET_START_DATE',
  startDate
});

const setEndDate = ({ endDate = undefined } = {}) => ({
  type: 'SET_END_DATE',
  endDate
});

export {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate
}