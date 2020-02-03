import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { authActions } from '../../actions';

const createMockStore = configureMockStore([thunk]);

test('Should set up the login action', () => {
  const store = createMockStore({});
  const uid = '12345qwerty';
  store.dispatch(authActions.login(uid));
  const actions = store.getActions();
  expect(actions[0]).toStrictEqual({
    type: 'LOGIN',
    uid
  });
});

test('Should set up the logout action', () => {
  const store = createMockStore({});
  store.dispatch(authActions.logout());
  const actions = store.getActions();
  expect(actions[0]).toStrictEqual({type: 'LOGOUT'});
});