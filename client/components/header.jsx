/* eslint-disable no-unused-vars */
import React from 'react';

function Header(props) {
  return (
    <div className="row">
      <h1 className='my-4 ml-4 col-6'>{props.text}</h1>
      <h3 className="col-3 offset-2 my-4">Average Grade
        <span className="ml-2 badge badge-secondary">{props.averageGrade}</span>
      </h3>
    </div>
  );
}

export default Header;
