import React from "react";
import PropTypes from "prop-types";

const AreaPartial = ({area, callback}) => {
    return (
        <label htmlFor={area.partial}>
            <input
                id={area.partial}
                onChange={callback}
                className="regions"
                type="checkbox"
                checked={area.selected}
                value={area.partial}
            />{`${area.name}, ${area.state}`}</label>
    );
};

AreaPartial.propTypes = {
    area: PropTypes.shape({
        partial:PropTypes.string.isRequired,
        selected:PropTypes.bool.isRequired,
        state:PropTypes.string.isRequired,
        name:PropTypes.string.isRequired,
    }),
    callback: PropTypes.func.isRequired
};

AreaPartial.defaultProps = {
    area:{
        partial:'',
        selected:false,
        state:'',
        name:''
    },
    callback:()=>{console.log('unbound-callback-area-partial')}
};

export default AreaPartial;