import filter from 'lodash/filter';

export default {
    getSearchData(state)
    {
        return state.search_data;
    },

    getSections(state)
    {
        return state.sections;
    },

    isAreaListOpen(state)
    {
        return state.is_area_list_open;
    },

    isRegionListOpen(state)
    {
        return state.is_region_list_open;
    },

    isSearchLoading(state)
    {
        return state.is_search_loading;
    },

    isConfLoaded(state)
    {
        return state.is_conf_loaded;
    },

    getPageTitle(state)
    {
        return state.conf_data.pagetitle;
    },

    getSearchExample(state)
    {
        return state.conf_data.search_example;
    },

    getFormFields(state)
    {
        return state.conf_data.form;
    },

    getFields(state)
    {
        return state.conf_data.fields;
    },

    getRegionList(state)
    {
        return state.conf_data.region_list;
    },

    getAreaList(state)
    {
        return state.conf_data.area_list;
    },

    getSelectedAreas(state)
    {
        return filter(state.conf_data.area_list,{
            selected:true
        });
    },

    getUnselectedAreas(state)
    {
        return filter(state.conf_data.area_list,{
            selected:false
        });
    },

    getTotalAreas(state)
    {
        return filter(state.conf_data.area_list,{
            selected:true
        }).length;
    }
}