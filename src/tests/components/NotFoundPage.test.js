import React from 'react';
import { shallow } from "enzyme";
import { NotFoundPage } from "../../components";
import expenses from "../fixtures/expenses";

test('Should render the not found page', () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
})