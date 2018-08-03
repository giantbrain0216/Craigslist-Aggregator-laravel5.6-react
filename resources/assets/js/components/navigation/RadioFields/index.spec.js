import React from 'react';
import { shallow } from 'enzyme';
import RadioFields from './index';

describe('RadioFields', () => {
    it('renders the component', () => {
        const wrapper = shallow(<RadioFields />);
        expect(wrapper).toMatchSnapshot();
    });
});