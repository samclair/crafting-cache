/* eslint-disable no-unused-vars */
import React from 'react';

function Header(props) {
  return (
    <div className="row">
      <h1 className='my-4 ml-2 col-6 header'>{props.text}</h1>
      <h3 className="col-5 my-4 grade-header">Average Grade
        <span className="ml-2 badge badge-secondary">{props.averageGrade}</span>
      </h3>
    </div>
  );
}

export default Header;
