import React from 'react';

function InventoryRow(props) {
  const item = props.item;
  return (
    <tr item={item.id}>
      <td scope='row'>{item.itemName}</td>
      <td>{item.amount}</td>
      <td>{item.notes}</td>
      <td className="align-middle">
        Delete/Edit
      </td>
    </tr>
  );
}

export default InventoryRow;
