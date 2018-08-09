import React from "react";
import PropTypes from "prop-types";

const RegionPartial = ({region, callback}) =>{
    return (
        <label htmlFor={region.type}>
            <input
                id={region.type}
                onChange={callback}
                className="regions"
                type="checkbox"
                checked={region.selected}
                value={region.type}
            />{region.name}</label>
    );
};

RegionPartial.propTypes = {
    region: PropTypes.shape({
        type:PropTypes.string.isRequired,
        selected:PropTypes.bool.isRequired,
        name:PropTypes.string.isRequired,
    }),
    callback: PropTypes.func.isRequired
};

RegionPartial.defaultProps = {
    region:{
        type:'',
        selected:false,
        name:''
    },
    callback:()=>{console.log('unbound-callback-region-partial')}
};

export default RegionPartial;