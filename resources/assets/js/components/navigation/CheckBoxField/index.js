import React from 'react';

export const CheckBoxField = ({field, cb}) =>{
    return (
        <div className="checkbox-field">
            <label className="fields" htmlFor={field.checkbox.arg_name}>{field.checkbox.title}</label>
            <input id={field.checkbox.arg_name}
                   className="fields"
                   type="checkbox"
                   onChange={(e)=>cb({elm:e, key:field.checkbox.arg_name})}
                   value={field.checkbox.value}
            />
            <br />
        </div>
    );
};
