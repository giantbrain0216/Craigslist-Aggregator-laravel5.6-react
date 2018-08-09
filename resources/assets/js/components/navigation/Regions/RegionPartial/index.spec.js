import React from 'react';
import { shallow } from 'enzyme';
import RegionPartial from './index';

describe('RegionPartial', () => {
    it('renders the component', () => {
        const wrapper = shallow(<RegionPartial />);
        expect(wrapper).toMatchSnapshot();
    });
});