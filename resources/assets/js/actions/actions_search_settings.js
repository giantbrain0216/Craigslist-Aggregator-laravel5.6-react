import each from "lodash/each";
import axios from "axios/index";
import constants from "../constants";

const _build_area_list = (area_list) => {
    let proxy_area = [];
    each(area_list, function(state)
    {
        each(state, function(rec)
        {
            rec.selected = false;
            proxy_area.push(rec);
        });
    });
    return proxy_area;
};

export const toggleRegionList = () => ({
    type: constants.actionTypes.SEARCH_SETTINGS_REGION_TOGGLE
});

export const toggleAreaList = () => ({
    type: constants.actionTypes.SEARCH_SETTINGS_AREA_TOGGLE
});

export const updateBasicConfData = ({title, page_title, search_example}) => ({
    type: constants.actionTypes.SEARCH_SETTINGS_UPDATE_BASIC_CONF_DATA,
    title,
    page_title,
    search_example
});

export const updateExtendedConfData = ({form, fields, area_list, region_list}) => ({
    type: constants.actionTypes.SEARCH_SETTINGS_UPDATE_EXTENDED_CONF_DATA,
    form,
    fields,
    area_list,
    region_list
});

export const confIsLoading = () => ({
    type: constants.actionTypes.SEARCH_SETTINGS_LOADING
});

export const confIsLoaded = () => ({
    type: constants.actionTypes.SEARCH_SETTINGS_LOADED
});

export const changeSite = (site) => ({
    type: constants.actionTypes.SEARCH_SETTINGS_SITE,
    site
});

export const updateAreaSelection = (area) => ({
    type: constants.actionTypes.SEARCH_SETTINGS_UPDATE_AREA_SELECTION,
    area
});

export const updateRegionSelection = (region) => ({
    type: constants.actionTypes.SEARCH_SETTINGS_UPDATE_AREA_SELECTION,
    region
});

export const fetchSearchSettings =  (site) => async (dispatch) => {
    dispatch(confIsLoading());
    dispatch(changeSite(site));

    let conf_init = await axios.get('/site/init',{
        params:{
            site
        }
    });

    let {title, page_title, search_example} = conf_init.data;

    dispatch(updateBasicConfData({
        title,
        page_title,
        search_example
    }));

    let conf_data = await axios.get('/sites/conf',{
        params:{
            site
        }
    });

    let {fields, area_list, region_list} = conf_data.data;

    let form = {};
    each(fields, (field)=>{
        switch(field.argType)
        {
            case 'text':
            case 'radio':
                form[field['argName']] = '';
                break;

            case 'checkbox':
                form[field['checkbox']['arg_name']] = '';
                break;
        }
    });

    each(region_list, (region)=>{
        region.selected = false;
    });

    dispatch(updateExtendedConfData({
        form:{
            site,
            ...form
        },
        fields,
        area_list:_build_area_list(area_list),
        region_list
    }));

    dispatch(confIsLoaded());
};