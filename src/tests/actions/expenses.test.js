import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expensesActions } from "../../actions";
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('Should set up the create expense action object', () => {
  const action = expensesActions.addExpense(expenses[0]);
  expect(action).toStrictEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[0]
  });
});

test('Should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'mouse',
    amount: 30,
    note: 'this one is better',
    createdAt: 1000
  }
  store.dispatch(expensesActions.startAddExpense(expenseData))
  .then(() => {
    const actions = store.getActions();
    expect(actions[0]).toStrictEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  })
  .then((snapshot) => {
    expect(snapshot.val()).toStrictEqual(expenseData);
    done();
  });
});

test('Should add expense with default values to database and store', (done) => {
  const store = createMockStore({});
  const defaultExpense = {
    description: '', 
    note: '', 
    amount: 0, 
    createdAt: 0 
  }

  store.dispatch(expensesActions.startAddExpense({}))
  .then(() => {
    const actions = store.getActions();
    expect(actions[0]).toStrictEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...defaultExpense 
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  })
  .then((snapshot) => {
    expect(snapshot.val()).toStrictEqual(defaultExpense);
    done();
  });
});

// test('Should set up the create exepense action object with default values', () => {
//   const action = expensesActions.addExpense({});
//   delete action.expense.id

//   expect(action).toStrictEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       description: '',
//       note: '',
//       amount: 0,
//       createdAt: 0
//     }
//   });
// })

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