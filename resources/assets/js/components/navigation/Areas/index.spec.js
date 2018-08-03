import React from 'react';
import { shallow } from 'enzyme';
import Areas from './index';

describe('Areas', () => {
    it('renders the component', () => {
        const wrapper = shallow(<Areas />);
        expect(wrapper).toMatchSnapshot();
    });
});