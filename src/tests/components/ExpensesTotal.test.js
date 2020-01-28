import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesTotal } from '../../components/ExpensesTotal';

test('Should render ExpensesTotal with $0.00', () => {
  const wrapper = shallow(<ExpensesTotal />);
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseTotal with $150.00', () => {
  const wrapper = shallow(<ExpensesTotal total={150} />);
  expect(wrapper).toMatchSnapshot();
})