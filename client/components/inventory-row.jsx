import React from 'react';

function InventoryRow(props) {
  const item = props.item;
  return (
    <tr item={item.id}>
      <td scope='row'>{item.itemName}</td>
      <td>{formatUnits(item.amount)}</td>
      <td>{item.notes}</td>
      <td className="align-middle">
        Delete/Edit
      </td>
    </tr>
  );
}

function formatUnits(unitString) {
  let unitComponents = unitString.split(' ');
  if (unitComponents[0] > 1) {
    unitComponents[1] = unitComponents[1] === 'inch' ? unitComponents[1] + 'es' : unitComponents[1] + 's';
  }
  return unitComponents.join(' ');
}

export default InventoryRow;
