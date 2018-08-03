import React from 'react';
import PropTypes from "prop-types";

const TextField = ({field, value, cb})=>{
    return (
        <div className="text-field">
            <label className="fields" htmlFor={field.argId}>{field.argTitle}</label>
            <input className="fields" onChange={(e)=>cb({elm:e, key:field.argName})} type="text" id={field.argId} />
            <br />
        </div>
    );
};

TextField.propTypes = {
    field: PropTypes.shape({
        argId:PropTypes.string.isRequired,
        argTitle:PropTypes.string.isRequired,
        argName:PropTypes.string.isRequired,
    }),
    value: PropTypes.string.isRequired,
    cb: PropTypes.func.isRequired
};

TextField.defaultProps = {
    field: {
        argId:'',
        argTitle:'',
        argName:'',
    },
    value :'',
    cb: ()=>{}
};

export default TextField;