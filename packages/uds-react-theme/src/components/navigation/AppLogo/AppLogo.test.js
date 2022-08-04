import React from 'react';
import { shallow } from 'enzyme';

import AppLogo from './AppLogo';

describe('AppContent', () => {
  const setup = (overrides = {}) => {
    const props = Object.assign({}, overrides);
    const wrapper = shallow(<AppLogo {...props} />);
    return { wrapper };
  };

  test('it renders', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });
});
