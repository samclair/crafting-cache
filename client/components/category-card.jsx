import React from 'react';
import Button from './button';

function CategoryCard(props) {
  return (
    <div className="card mx-3 my-3" style={{ width: '18rem', cursor: 'pointer' }}>
      <div className="card-body">
        <div className="container row d-flex align-items-center">
          <h5 className="card-title mr-auto">{props.categoryName}</h5>
          <Button color = 'delete-button mb-auto align-self-left' symbol='fa-times'handleClick={() => (props.handleDelete(props.categoryName))} text='' />
        </div>
        <h6 className="card-subtitle mb-2 text-muted">Inventory Count: </h6>
        <a href='#' className="card-text">View Inventory</a>
      </div>
    </div>);
}

export default CategoryCard;
