import React from 'react';
import { shallow } from 'enzyme';
import Regions from './regions_component';

describe('Regions', () => {
    it('renders the component', () => {
        const wrapper = shallow(<Regions />);
        expect(wrapper).toMatchSnapshot();
    });
});