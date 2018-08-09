import React from 'react';
import { shallow } from 'enzyme';
import Areas from './areas_component';

import data from '../test-data/region-areas.test';

describe('Areas', () => {
    it('renders the component', () => {
        const wrapper = shallow(<Areas area_list={data.area_list} />);
        expect(wrapper).toMatchSnapshot();
    });
});