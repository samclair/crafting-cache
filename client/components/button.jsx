import React from 'react';

function Button(props) {
  let text = props.text ? <span className='ml-2'>{props.text}</span> : null;
  return <div onClick={props.handleClick} className = {`${props.color} px-2 py-1 custom-button d-flex align-items-center`}>
    <i className={`fas ${props.symbol}`}></i>
    {text}
  </div>;
}

export default Button;
