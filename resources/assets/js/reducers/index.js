import { combineReducers } from 'redux';
import { locationListingReducer } from './reducer_location';
import { searchConfigurationReducer } from './reducer_search_settings';

const rootReducer = combineReducers({
    locations: locationListingReducer,
    search_settings: searchConfigurationReducer
});

export default rootReducer;