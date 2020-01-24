import React from 'react';
import { 
  ExpenseList,
  ExpenseListFilters
} from '.';

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;