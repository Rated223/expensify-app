import uuid from 'uuid';  

const addExpense = ({ 
  description = '', 
  note = '', 
  amount = 0, 
  createdAt = 0 
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const editExpense = ({ id, update }) => ({
  type: 'EDIT_EXPENSE',
  id,
  update
});

export {
  addExpense,
  removeExpense,
  editExpense
}