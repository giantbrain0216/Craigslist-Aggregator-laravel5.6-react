import constants from '../constants';

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
    fields:[]
};

export const searchConfigurationReducer = (state = initialState, action) => {
    switch (action.type) {

        case constants.actionTypes.SEARCH_SETTINGS_SITE:
            return {
                ...state,
                site:action.site
            };

        case constants.actionTypes.SEARCH_SETTINGS_UPDATE_FORM_FIELDS:
            return {
                ...state,
                form:{
                    ...state.form,
                    [action.key]:action.value
                }
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
            let {selected, partial} = action.area;

            return {
                ...state,
                area_list:{
                    ...state.area_list,
                    [partial]:{
                        ...action.area,
                        selected
                    }
                }
            };
        }

        case constants.actionTypes.SEARCH_SETTINGS_UPDATE_REGION_SELECTION:
        {
            let {selected} = action.region;

            let area_list = {
                ...state.area_list
            };

            Object.entries(state.area_list)
                .filter(([key, area]) => area.type === action.region.type)
                .forEach(([key, area]) => {
                    area_list[key] = {
                        ...area,
                        selected
                    }
                });

            return {
                ...state,
                region_list:{
                    ...state.region_list,
                    [action.region.type]:{
                        ...action.region
                    }
                },
                area_list
            }
        }

        default:
            return state;
    }
};
