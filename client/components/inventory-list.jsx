import React from 'react';
import InventoryTable from './inventory-table';

class InventoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryList: [{
        itemName: 'Black Paint',
        amount: '1 unit',
        notes: 'Use for upcoming festival',
        id: 1 },
      {
        itemName: 'Red Paint',
        amount: '2 units',
        notes: 'Use for upcoming festival',
        id: 2
      },
      {
        itemName: 'Blue Paint',
        amount: '4 units',
        notes: 'Use for upcoming festival',
        id: 3
      }
      ]
    };
  }

  render() {
    return (
      <div className='container'>
        <div className="row my-3">
          <h2 className='menu-heading'>Inventory List</h2>
        </div>
        <div className="d-flex flex-row flex-lg-row flex-column-reverse">
          <InventoryTable inventory={this.state.inventoryList}/>
        </div>
      </div>);
  }
}

export default InventoryList;
