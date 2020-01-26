import { expensesActions } from "../../actions";

test('Should set up the create expense action object', () => {
  const expense = {
    description: "desc",
    note: "quick note",
    amount: 100,
    createdAt: 200
  }
  const action = expensesActions.addExpense(expense);
  delete action.expense.id

  expect(action).toStrictEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description: "desc",
      note: "quick note",
      amount: 100,
      createdAt: 200
    }
  });
});

test('Should set up the create exepense action object with default values', () => {
  const action = expensesActions.addExpense({});
  delete action.expense.id

  expect(action).toStrictEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    }
  });
})

test('Should update a expense', () => {
  const update = { note: 'New note value' }
  const action = expensesActions.editExpense({ id: "qwe456", update });

  expect(action).toStrictEqual({
    type: 'EDIT_EXPENSE',
    id: "qwe456",
    update: {
      note: 'New note value'
    }
  })
});

test('Should set up remove expense action object', () => {
  const action = expensesActions.removeExpense({ id: "123abc" });

  expect(action).toStrictEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});