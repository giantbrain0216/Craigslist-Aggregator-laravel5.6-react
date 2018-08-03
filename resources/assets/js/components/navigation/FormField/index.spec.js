import React from 'react';
import { shallow } from 'enzyme';
import FormField from './index';

describe('FormField', () => {
    it('renders the component', () => {
        const wrapper = shallow(<FormField />);
        expect(wrapper).toMatchSnapshot();
    });
});