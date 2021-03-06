import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expensesActions } from "../../actions";
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'testuid';
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({id, description, note, amount, createdAt}) => {
    expensesData[id] = { description, note, amount, createdAt }
  })
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
})

test('Should set up the create expense action object', () => {
  const action = expensesActions.addExpense(expenses[0]);
  expect(action).toStrictEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[0]
  });
});

test('Should add expense to database and store', (done) => {
  const store = createMockStore({ auth: { uid } });
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

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  })
  .then((snapshot) => {
    expect(snapshot.val()).toStrictEqual(expenseData);
    done();
  });
});

test('Should add expense with default values to database and store', (done) => {
  const store = createMockStore({ auth: { uid } });
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

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  })
  .then((snapshot) => {
    expect(snapshot.val()).toStrictEqual(defaultExpense);
    done();
  });
});

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

test('Should update a expense in the database', (done) => {
  const store = createMockStore({ auth: { uid }, expenses});
  const expense = store.getState().expenses[0];
  const update = {
    description: 'new Edit description'
  }

  store.dispatch(expensesActions.startEditExpense({
    id: expense.id, 
    update 
  }))
  .then(() => {
    const actions = store.getActions();
    expect(actions[0]).toStrictEqual({
      type: 'EDIT_EXPENSE',
      id: expense.id,
      update

    })
    return database.ref(`users/${uid}/expenses/${expense.id}`).once('value');
  })
  .then((editExpense) => {
    const {description, note, amount, createdAt} = expense;
    expect(editExpense.val()).toEqual({
      description,
      note,
      amount,
      createdAt,
      ...update
    });
    done();
  })
})

test('Should set up remove expense action object', () => {
  const action = expensesActions.removeExpense({ id: "123abc" });

  expect(action).toStrictEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('Should remove expense from database and store', (done) => {
  const store = createMockStore({ auth: { uid }, expenses});
  const expenseId = store.getState().expenses[0].id;

  store.dispatch(expensesActions.startRemoveExpense({id: expenseId}))
  .then(() => {
    const actions = store.getActions();
    expect(actions[0]).toStrictEqual({
      type: 'REMOVE_EXPENSE',
      id: expenseId
    });
    return database.ref(`users/${uid}/expenses/${expenseId}`).once('value');
  })
  .then((expense) => {
    expect(expense.val()).toBe(null);
    done();
  })

});

test('should setup set expenses action object with data', () => {
  const action = expensesActions.setExpenses(expenses);
  expect(action).toStrictEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('Should fetch the expenses from firebase', (done) => {
  const store = createMockStore({ auth: { uid } });
  
  store.dispatch(expensesActions.startSetExpenses())
  .then(() => {
    const actions = store.getActions();
    expect(actions[0]).toStrictEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  })
});
