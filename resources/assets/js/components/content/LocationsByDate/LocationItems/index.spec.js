import React from 'react';
import { shallow } from 'enzyme';
import LocationItems from './index';

describe('LocationItems', () => {
    it('renders the component', () => {
        const wrapper = shallow(<LocationItems />);
        expect(wrapper).toMatchSnapshot();
    });
});