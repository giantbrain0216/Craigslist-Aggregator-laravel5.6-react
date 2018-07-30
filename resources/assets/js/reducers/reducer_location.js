import { LOCATION_REQUEST, LOCATION_RECEIVE } from '../constants/ActionTypes';

export const initialState = {
    loading:false,
    search_data:[],
};

export const locationListingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOCATION_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                search_data: []
            });

        case LOCATION_RECEIVE:
            return Object.assign({}, state, {
                loading: false,
                search_data: action.results
            });
        default:
            return state;
    }
};
