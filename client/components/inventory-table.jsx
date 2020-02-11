import React from 'react';
import InventoryRow from './inventory-row';

function InventoryTable(props) {
  let tableData = props.inventory.length ? props.inventory.map(item => {
    let rowKey = item.id + item.itemName + item.amountString + item.notes;
    return <InventoryRow
      unitList={props.unitList}
      handleDelete={props.handleDelete}
      key={rowKey}
      item={item}
      onSubmit={props.handleEdit} />;
  }) : <tr><td colSpan='4' style={{ textAlign: 'center' }}>You do not currently have any items in this category :(</td></tr>;
  return (<>
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
        {tableData}
      </tbody>
    </table>
    </>
  );
}

export default InventoryTable;
