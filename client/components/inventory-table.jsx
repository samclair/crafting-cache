import React from 'react';
import InventoryRow from './inventory-row';

function InventoryTable(props) {
  return (
    <table className="mx-lg-4 table table-striped table-header col-sm-11 col-lg-7 table-bordered">
      <thead>
        <tr>
          <th scope='col'>Item</th>
          <th scope='col'>Amount</th>
          <th scope='col'>Notes</th>
          <th scope='col'>Options</th>
        </tr>
      </thead>
      <tbody>
        {
          props.inventory.map(item => {
            return <InventoryRow
              unitList = {props.unitList }
              handleDelete = {props.handleDelete}
              key={item.id}
              item={item}
              onSubmit = {props.handleEdit}/>;
          })
        }
      </tbody>
    </table>
  );
}

export default InventoryTable;
