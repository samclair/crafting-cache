import React from 'react';

function FormInput(props) {
  let formIcon = props.symbol ? (<div className="input-group-prepend">
    <div className="input-group-text">
      <i className={'fas ' + props.symbol}></i>
    </div>
  </div>) : null;
  let optionalField = props.optionalField ? props.optionalField : null;
  return (
    <div className="input-group mb-2">
      {formIcon}
      <input
        onChange={props.handleChange}
        onBlur = {props.handleBlur}
        value={props.fieldValue.input}
        name={props.fieldName}
        className={'form-control ' + (props.fieldValue.isFocused ? (props.fieldValue.isValid ? 'is-valid' : 'is-invalid') : '')}
        type="text"
        placeholder={props.fieldName[0].toUpperCase() + props.fieldName.slice(1)} />
      {optionalField}
    </div>
  );
}

export default FormInput;
