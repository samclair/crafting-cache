import React from 'react';
import Button from './button';

class InventoryRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'info'
    };
  }

  formatUnits(unitString) {
    let unitComponents = unitString.split(' ');
    if (unitComponents[0] > 1) {
      unitComponents[1] = unitComponents[1] === 'inch' ? unitComponents[1] + 'es' : unitComponents[1] + 's';
    }
    return unitComponents.join(' ');
  }

  render() {
    const item = this.props.item;
    return (
      <tr item={item.id}>
        <td scope='row'>{item.itemName}</td>
        <td>{this.formatUnits(item.amount)}</td>
        <td>{item.notes}</td>
        <td className="align-middle">
          <Button color='delete-button mb-auto align-self-left' symbol='fa-times' handleClick={() => this.props.handleDelete(item.id)} text='' />
        </td>
      </tr>
    );
  }
}

export default InventoryRow;
