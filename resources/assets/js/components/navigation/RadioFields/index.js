import React from 'react';

const RadioField = ({field, radio, cb})=>{
    return (
        <div className="radio-box-field">
            <label className="fields"
                   htmlFor={radio.arg_name_id}>{radio.arg_name}</label>
            <input className="fields"
                   id={radio.arg_name_id}
                   type="radio"
                   name={field.argName}
                   onChange={(e)=>cb({elm:e, key:field.argName})}
                   value={radio.arg}  />
            <br />
        </div>
    );
};

export const RadioFields = ({field, radios, cb})=>{
    return (
        <div className="radio-box-fields">
            {radios.map(radio=>{
                return (
                    <RadioField key={radio.arg_name_id} field={field} radio={radio} cb={cb} />
                );
            })}
        </div>
    );
};