import React from 'react';
import { shallow } from 'enzyme';
import TextField from './index';

describe('TextField', () => {
    it('renders the component', () => {
        const wrapper = shallow(<TextField />);
        expect(wrapper).toMatchSnapshot();
    });
});