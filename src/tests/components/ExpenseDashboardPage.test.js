import React from 'react';
import { shallow } from "enzyme";
import { ExpenseDashboardPage } from "../../components";
import expenses from "../fixtures/expenses";

test('Should render the daashboard page', () => {
  const wrapper = shallow(<ExpenseDashboardPage />);
  expect(wrapper).toMatchSnapshot();
});