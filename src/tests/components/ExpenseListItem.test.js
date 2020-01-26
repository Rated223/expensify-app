import React from 'react';
import { shallow } from "enzyme";
import { ExpenseListItem } from "../../components";
import expenses from '../fixtures/expenses';

test('Should render a expense item', () => {
  const wrapper = shallow(<ExpenseListItem key={expenses[0].id} {...expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});
