import each from 'lodash/each'
import Vue from 'vue';

export default {
    changeSite(state, site)
    {
        state.site = site;
    },

    runningSearch(state)
    {
        state.is_search_loading = true;
    },

    updateSearchData(state, newState)
    {
        state.is_search_loading = false;
        state.search_data = Object.assign([], newState);
    },

    runningConfUpdate(state)
    {
        state.is_conf_loaded = false;
    },

    updateConfData(state, newState)
    {
        state.conf_data = Object.assign(state.conf_data, newState);
    },

    completedConfUpdate(state)
    {
        state.is_conf_loaded = true;
    },

    toggleAreaList(state)
    {
        state.is_area_list_open = !state.is_area_list_open;
    },

    toggleRegionList(state)
    {
        state.is_region_list_open = !state.is_region_list_open;
    },

    updateRegionSelection(state, region)
    {
        let selected = !region.selected;
        let index = state.conf_data.region_list.indexOf(region);
        let oldState = state.conf_data.region_list[index];

        state.conf_data.region_list.splice(index, 1, Object.assign({}, {
            ...oldState,
            selected
        }));

        each(state.conf_data.area_list, (obj, idx) => {
            if(obj.type === region.type)
            {
                state.conf_data.area_list.splice(idx, 1, Object.assign({},{
                    ...obj,
                    selected
                }));
            }
        });
    },

    updateAreaSelection(state, area)
    {
        let selected = !area.selected;
        let index = state.conf_data.area_list.indexOf(area);
        let oldState = state.conf_data.area_list[index];

        state.conf_data.area_list.splice(index, Object.assign({}, {
            ...oldState,
            selected
        }));

    }
}