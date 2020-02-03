import React from 'react';
import { shallow } from 'enzyme';
import { LoadingPage } from '../../components';

test('Should render Header correctly', () => {
  const wrapper = shallow(<LoadingPage />);
  expect(wrapper).toMatchSnapshot();
});