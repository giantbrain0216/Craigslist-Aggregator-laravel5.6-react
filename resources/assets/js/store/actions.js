import filter from "lodash/filter";
import axios from "axios/index";
import map from "lodash/map";
import each from "lodash/each";

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

export default {
    submitSearch: async ({commit, state}, data) => {

        commit('runningSearch');

        let {form} = data;

        let submit_data = Object.assign({

            include: map(filter(state.conf_data.area_list,{
                selected:true
            }), obj=>obj.partial),

            regions: map(filter(state.conf_data.region_list,{
                selected:true
            }), obj => obj.type)
        }, form);

        submit_data = {
            ...submit_data,
            site:state.site
        };

        let results = await axios.post('/sites/fetch', submit_data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        let {search_results} = results.data;

        commit('updateSearchData', search_results)
    },

    fetchConfig: async ({commit, state}, site)=> {

        let newSite = site || state.site;

        commit('runningConfUpdate');
        commit('changeSite', newSite);

        let conf_init = await axios.get('/site/init',{
            params:{
                site:newSite
            }
        });

        let {title, page_title, search_example} = conf_init.data;

        commit('updateConfData',{
            title,
            page_title,
            search_example
        });

        let conf_data = await axios.get('/sites/conf',{
            params:{
                site:newSite
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

        commit('updateConfData',{
            form:{
                site:newSite,
                ...form
            },
            fields,
            area_list:_build_area_list(area_list),
            region_list
        });

        commit('completedConfUpdate');
    }
}