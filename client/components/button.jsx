import React from 'react';

function Button(props) {
  return <div onClick={props.handleClick} className = 'px-2 py-1 custom-button d-flex align-items-center'>
    <i className="fas fa-plus-square mr-2"></i>
    {props.text}
  </div>;
}

export default Button;
