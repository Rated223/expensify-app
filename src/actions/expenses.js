import database from '../firebase/firebase';

const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '', 
      note = '', 
      amount = 0, 
      createdAt = 0 
    } = expenseData;

    const expense = { description, note, amount, createdAt };
    
    return database.ref('expenses').push(expense)
    .then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }))
    })
    .catch((err) => {
      console.error('firebase ', err);
    })
  }
}

const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const startRemoveExpense = ({ id }) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).remove()
    .then(() => {
      dispatch(removeExpense({ id }));
    })
    .catch((err) => {
      console.error('firebase ', err);
    })
  }
}

const editExpense = ({ id, update }) => ({
  type: 'EDIT_EXPENSE',
  id,
  update
});

const startEditExpense = ({  id, update }) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).update({...update})
    .then(() => {
      dispatch(editExpense({ id, update }));
    }).catch((err) => {
      console.error('firebase ', err);
    })
  }
}

const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

const startSetExpenses = () => {
  return (dispatch) => {
    return database.ref('expenses').once('value')
    .then((snapshot) => {
      const expenses = [];

      snapshot.forEach((child) => {
        expenses.push({
          id: child.key,
          ...child.val()
        });
      });

      dispatch(setExpenses(expenses));
    })
    .catch((err) => {
      console.error('firebase ', err);
    })
  }
}

export {
  addExpense,
  startAddExpense,
  removeExpense,
  startRemoveExpense,
  editExpense,
  startEditExpense,
  setExpenses,
  startSetExpenses
}