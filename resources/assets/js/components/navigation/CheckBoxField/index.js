import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxField = ({checkbox, cb}) =>{
    return (
        <div className="checkbox-field">
            <label className="fields" htmlFor={checkbox.arg_name}>{checkbox.title}</label>
            <input id={checkbox.arg_name}
                   className="fields"
                   type="checkbox"
                   onChange={(e)=>cb({elm:e, key:checkbox.arg_name})}
                   value={checkbox.value}
            />
        </div>
    );
};

CheckBoxField.propTypes = {
    checkbox:PropTypes.shape({
        title:PropTypes.string.isRequired,
        arg_name:PropTypes.string.isRequired,
        value:PropTypes.string.isRequired,
    }),
    cb: PropTypes.func.isRequired,
};

CheckBoxField.defaultProps = {
    checkbox:{
        title:'',
        arg_name:'',
        value:''
    },
    cb:()=>{console.log('checkbox-un-bound')}
};

export default CheckBoxField;