import constants from '../constants';
import filter from 'lodash/filter';
import map from 'lodash/map';

export const initialState = {
    sections:['stuff','jobs','gigs','places','services'],
    site:'jobs',
    loading:false,
    loaded:false,
    is_area_list_open:false,
    is_region_list_open:false,
    form:{},
    title:'',
    page_title:'',
    page_search_example:'',
    area_list:{},
    region_list:{},
    fields:{}
};

export const searchConfigurationReducer = (state = initialState, action) => {
    switch (action.type) {

        case constants.actionTypes.SEARCH_SETTINGS_SITE:
            return {
                ...state,
                site:action.site
            };

        case constants.actionTypes.SEARCH_SETTINGS_UPDATE_BASIC_CONF_DATA:
            return {
                ...state,
                title:action.title,
                page_title:action.page_title,
                search_example:action.search_example
            };

        case constants.actionTypes.SEARCH_SETTINGS_UPDATE_EXTENDED_CONF_DATA:
            return {
                ...state,
                form:action.form,
                fields:action.fields,
                area_list:action.area_list,
                region_list:action.region_list
            };

        case constants.actionTypes.SEARCH_SETTINGS_LOADING:
            return {
                ...state,
                loading:true,
            };

        case constants.actionTypes.SEARCH_SETTINGS_LOADED:
            return {
                ...state,
                loading:false,
                loaded:true
            };

        case constants.actionTypes.SEARCH_SETTINGS_REGION_TOGGLE:
            return {
                ...state,
                is_region_list_open: !state.is_region_list_open
            };

        case constants.actionTypes.SEARCH_SETTINGS_AREA_TOGGLE:
            return {
                ...state,
                is_area_list_open: !state.is_area_list_open
            };

        case constants.actionTypes.SEARCH_SETTINGS_UPDATE_AREA_SELECTION:
        {
            let selected = !action.area.selected;
            state.area_list[action.area.partial] = {
                ...action.area,
                selected
            };

            return {
                ...state
            }
        }

        case constants.actionTypes.SEARCH_SETTINGS_UPDATE_REGION_SELECTION:
        {
            let selected = !action.region.selected;

            state.region_list[action.region.type] = {
                ...action.region,
                selected
            };

            let update = filter(state.area_list, (area)=>{
                return area.type === action.region.type;
            });

            map(update, (area)=>{
                state.area_list[area.partial] = {
                    ...area,
                    selected
                };
            });

            return {
                ...state
            }
        }

        default:
            return state;
    }
};
