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
    area_list:[],
    region_list:[],
    fields:{}
};

export const searchConfigurationReducer = (state = initialState, action) => {
    switch (action.type) {

        case constants.actionTypes.SEARCH_SETTINGS_SITE:
            return Object.assign({}, {
                ...state,
                site:action.site
            });

        case constants.actionTypes.SEARCH_SETTINGS_UPDATE_BASIC_CONF_DATA:
            return Object.assign({}, {
                ...state,
                title:action.title,
                page_title:action.page_title,
                search_example:action.search_example
            });

        case constants.actionTypes.SEARCH_SETTINGS_UPDATE_EXTENDED_CONF_DATA:
            return Object.assign({}, {
                ...state,
                form:action.form,
                fields:action.fields,
                area_list:action.area_list,
                region_list:action.region_list
            });

        case constants.actionTypes.SEARCH_SETTINGS_LOADING:
            return Object.assign({}, {
                ...state,
                loading:true,
            });

        case constants.actionTypes.SEARCH_SETTINGS_LOADED:
            return Object.assign({}, {
                ...state,
                loading:false,
                loaded:true
            });

        case constants.actionTypes.SEARCH_SETTINGS_REGION_TOGGLE:
            return Object.assign({}, {
                ...state,
                is_region_list_open: !state.is_region_list_open
            });

        case constants.actionTypes.SEARCH_SETTINGS_AREA_TOGGLE:
            return Object.assign({}, {
                ...state,
                is_area_list_open: !state.is_area_list_open
            });

        case constants.actionTypes.SEARCH_SETTINGS_UPDATE_AREA_SELECTION:
        {
            let selected = !action.area.selected;
            let index = state.area_list.indexOf(action.area);
            let oldState = state.area_list[index];

            state.area_list.splice(index, Object.assign({}, {
                ...oldState,
                selected
            }));

            return Object.assign({}, {
                ...state
            });
        }

        case constants.actionTypes.SEARCH_SETTINGS_UPDATE_REGION_SELECTION:
        {
            let selected = !action.region.selected;
            let index = state.region_list.indexOf(action.region);
            let oldState = state.region_list[index];

            state.region_list.splice(index, 1, Object.assign({}, {
                ...oldState,
                selected
            }));

            state.area_list.forEach((obj, idx)=>{
                if(obj.type === action.region.type)
                {
                    state.area_list.splice(idx, 1, Object.assign({}, {
                        ...obj,
                        selected
                    }));
                }
            });

            return Object.assign({}, {
                ...state
            });
        }

        default:
            return state;
    }
};
