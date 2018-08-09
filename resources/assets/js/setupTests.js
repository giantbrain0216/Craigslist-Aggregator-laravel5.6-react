import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.React = React;
global.Enzyme = Enzyme;
global.shallow = shallow;
global.configureStore = configureStore;