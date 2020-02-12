import React from 'react';

function InvalidInput(props) {

  return (
    <>
    <div className="mb-2 error-message">{props.text}</div>
    </>
  );
}

export default InvalidInput;
