import React from 'react';
import { shallow } from 'enzyme';
import LocationItemLink from './index';

describe('LocationItemLink', () => {
    it('renders the component', () => {
        const wrapper = shallow(<LocationItemLink />);
        expect(wrapper).toMatchSnapshot();
    });
});