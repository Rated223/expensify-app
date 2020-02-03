import { authReducer } from '../../reducers';

test('Should save the user id', () => {
  const action = {
    type: 'LOGIN',
    uid: '12345qwerty'
  }
  const state = authReducer(undefined, action);
  expect(state).toStrictEqual({uid: action.uid});
});

test('Should remove the user id in logout', () => {
  const action = {
    type: 'LOGOUT'
  }

  const state = authReducer({ uid: '12345qwerty' }, action);
  expect(state).toStrictEqual({});
});

