import React from 'react';
import PropTypes from "prop-types";

const RadioField = ({fieldName, radio, cb})=>{
    return (
        <div className="radio-box-field">
            <label className="fields"
                   htmlFor={radio.arg_name_id}>{radio.arg_name}</label>
            <input className="fields"
                   id={radio.arg_name_id}
                   type="radio"
                   name={fieldName}
                   onChange={(e)=>cb({elm:e, key:fieldName})}
                   value={radio.arg}  />
            <br />
        </div>
    );
};

RadioField.propTypes = {
    radio: PropTypes.shape({
        arg_name_id:PropTypes.string.isRequired,
        arg_name:PropTypes.string.isRequired,
        arg:PropTypes.string.isRequired,
    }),
    fieldName: PropTypes.string.isRequired,
    cb: PropTypes.func.isRequired,
};

RadioField.defaultProps = {
    radio: {
        arg_name_id:'',
        arg_name:'',
        arg:''
    },
    fieldName:'',
    cb:()=>{}
};

const RadioFields = ({fieldName, radios, cb})=>{
    return (
        <div className="radio-box-fields">
            {radios.map(radio=>{
                return (
                    <RadioField key={radio.arg_name_id} fieldName={fieldName} radio={radio} cb={cb} />
                );
            })}
        </div>
    );
};

RadioFields.propTypes = {
    field: PropTypes.object.isRequired,
    radios: PropTypes.array.isRequired,
    cb: PropTypes.func.isRequired,
};

RadioFields.defaultProps = {
    field: {},
    radios: [],
    cb:()=>{}
};

export default RadioFields;