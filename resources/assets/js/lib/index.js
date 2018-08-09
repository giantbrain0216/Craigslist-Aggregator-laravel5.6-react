import reduce from "lodash/reduce";
import each from "lodash/each";

export const parseRegionList = (list)=>{
    return reduce(list, (collector, region) => {
        region.selected = false;
        collector[region.type] = region;
        return collector;
    }, {});
};

export const parseAreaList = (list)=>{
    return reduce(list, function(collector, state)
    {
        each(state, function(rec)
        {
            rec.selected = false;
            collector[rec.partial] = rec;
        });
        return collector;
    }, {});
};