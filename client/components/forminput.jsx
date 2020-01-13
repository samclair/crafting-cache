import React from 'react';

function FormInput(props) {
  return (
    <div className="input-group mb-2">
      <div className="input-group-prepend">
        <div className="input-group-text">
          <i className={'fas ' + props.symbol}></i>
        </div>
      </div>
      <input
        onChange={props.onChange}
        onBlur = {props.onBlur}
        value={props.value.input}
        name={props.name}
        className={'form-control ' + (props.value.isFocused ? (props.value.isValid ? 'is-valid' : 'is-invalid') : '')}
        type="text"
        placeholder={props.name[0].toUpperCase() + props.name.slice(1)} />
    </div>
  );
}

export default FormInput;
