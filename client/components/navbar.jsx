import React from 'react';

function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-heading">
      <span className="py-1 mr-2">{props.text}</span>
    </nav>
  );
}

export default Navbar;
