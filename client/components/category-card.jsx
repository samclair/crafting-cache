import React from 'react';

function CategoryCard(props) {
  return (
    <div className="card mx-3 my-3" style={{ width: '18rem', cursor: 'pointer' }}>
      <div className="card-body">
        <h5 className="card-title">{props.categoryName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Inventory Count: </h6>
        <a href='#' className="card-text">View Inventory</a>
      </div>
    </div>);
}

export default CategoryCard;
