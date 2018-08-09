import React from 'react';
import { shallow } from 'enzyme';
import Navigation from './navigation_component';

describe('Navigation', () => {
    it('renders the component', () => {
        const wrapper = shallow(<Navigation />);
        expect(wrapper).toMatchSnapshot();
    });
});