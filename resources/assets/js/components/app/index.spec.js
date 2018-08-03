import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

describe('App', () => {
    it('renders the component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toMatchSnapshot();
    });
});