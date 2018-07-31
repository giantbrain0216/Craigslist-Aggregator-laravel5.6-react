import React from 'react';

export const TextField = ({field, value, cb})=>{
    return (
        <div className="text-field">
            <label className="fields" htmlFor={field.argId}>{field.argTitle}</label>
            <input className="fields" onChange={(e)=>cb({elm:e, key:field.argName})} type="text" value={value} id={field.argId} />
            <br />
        </div>
    );
};