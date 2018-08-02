import map from "lodash/map";
import filter from "lodash/filter";
import axios from "axios/index";
import constants from "../constants";

export const locationFetching = () => ({
    type: constants.actionTypes.LOCATION_REQUEST
});

export const updateSearchData = (results) => ({
    type: constants.actionTypes.LOCATION_RECEIVE,
    results
});

export const submitSearch = ({data, site, area_list, region_list}) => async (dispatch) => {
    dispatch(locationFetching());

    let submit_data = Object.assign({

        include: map(filter(area_list,{
            selected:true
        }), obj=>obj.partial),

        regions: map(filter(region_list,{
            selected:true
        }), obj => obj.type)
    }, data);

    submit_data = {
        ...submit_data,
        site:site
    };

    let results = await axios.post('/sites/fetch', submit_data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    let {search_results} = results.data;

    dispatch(updateSearchData(search_results));
};