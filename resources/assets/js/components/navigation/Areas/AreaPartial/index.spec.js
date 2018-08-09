import React from 'react';
import { shallow } from 'enzyme';
import AreaPartial from './index';

describe('AreaPartial', () => {
    it('renders the component', () => {
        const wrapper = shallow(<AreaPartial />);
        expect(wrapper).toMatchSnapshot();
    });
});