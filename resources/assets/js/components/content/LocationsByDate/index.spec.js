import React from 'react';
import { shallow } from 'enzyme';
import LocationByDate from './index';

describe('LocationByDate', () => {
    it('renders the component', () => {
        const wrapper = shallow(<LocationByDate />);
        expect(wrapper).toMatchSnapshot();
    });
});