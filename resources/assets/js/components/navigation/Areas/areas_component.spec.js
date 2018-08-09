import React from 'react';
import { shallow } from 'enzyme';
import Areas from './areas_component';
import * as lib from "../../../lib";
import data from '../test-data/region-areas.test';
const area_list = lib.parseAreaList(data.area_list);

describe('Areas', () => {
    it('renders the component', () => {
        const wrapper = shallow(<Areas area_list={area_list} />);
        expect(wrapper).toMatchSnapshot();
    });
});