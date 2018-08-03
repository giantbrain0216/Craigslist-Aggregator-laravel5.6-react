import React from 'react';
import { shallow } from 'enzyme';
import CheckBoxField from './index';

describe('CheckBoxField', () => {
    it('renders the component', () => {
        const wrapper = shallow(<CheckBoxField />);
        expect(wrapper).toMatchSnapshot();
    });
});