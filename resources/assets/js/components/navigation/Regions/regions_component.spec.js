import React from 'react';
import { shallow } from 'enzyme';
import Regions from './regions_component';
import * as lib from "../../../lib";
import data from '../test-data/region-areas.test';
const region_list = lib.parseRegionList(data.region_list);

describe('Regions', () => {
    it('renders the component', () => {
        const wrapper = shallow(<Regions region_list={region_list} />);
        expect(wrapper).toMatchSnapshot();
    });
});