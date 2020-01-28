const getExpensesTotal = (expenses = []) => {
  const amounts = expenses.map(expense => expense.amount);

  if (!amounts.length) {
    return 0;
  }
  
  return amounts.reduce((total, amount) => total + amount); 
}

export default getExpensesTotal;