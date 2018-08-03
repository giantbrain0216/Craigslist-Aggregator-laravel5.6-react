import React from 'react';
import { shallow } from 'enzyme';
import TopHeader from './index';

describe('TopHeader', () => {
    it('renders the component', () => {
        const wrapper = shallow(<TopHeader />);
        expect(wrapper).toMatchSnapshot();
    });
});