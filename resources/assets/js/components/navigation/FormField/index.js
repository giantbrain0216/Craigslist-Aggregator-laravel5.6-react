import React from 'react';
import TextField from '../TextField';
import RadioFields from '../RadioFields';
import CheckBoxField from '../CheckBoxField';
import PropTypes from "prop-types";

const FormField = ({field, onTextChange, onRadioChange, onCheckBoxChange}) =>{
    switch(field.argType)
    {
        case 'text':
            return (
                <TextField
                    field={field}
                    cb={onTextChange}
                    />
            );

        case 'radio':
            return (
                <RadioFields
                    fieldName={field.argName}
                    cb={onRadioChange}
                    radios={field.radios} />
            );

        case 'checkbox':
            return (
                <CheckBoxField
                    checkbox={field.checkbox}
                    cb={onCheckBoxChange} />
            );
    }
};

FormField.propTypes = {
    field: PropTypes.object.isRequired,
    onTextChange: PropTypes.func.isRequired,
    onRadioChange: PropTypes.func.isRequired,
    onCheckBoxChange: PropTypes.func.isRequired
};

FormField.defaultProps = {
    field:{},
    onTextChange:()=>{console.log('onTextChange:unbound')},
    onRadioChange:()=>{console.log('onRadioChange:unbound')},
    onCheckBoxChange:()=>{console.log('onCheckBoxChange:unbound')}
};

export default FormField;