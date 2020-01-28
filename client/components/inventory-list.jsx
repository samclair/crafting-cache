import React from 'react';
import InventoryTable from './inventory-table';
import ItemForm from './item-form';

class InventoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryList: []
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    this.getInventory(this.props.categoryId);
  }

  getInventory(categoryId) {
    fetch(`api/inventory?categoryId=${categoryId}`)
      .then(res => res.json())
      .then(inventory => this.setState({ inventoryList: inventory }));

  }

  addItem(item) {
    // eslint-disable-next-line no-console
    console.log(item);
    this.setState({ inventoryList: this.state.inventoryList.concat(item) });
  }

  deleteItem(id) {
    // eslint-disable-next-line no-console
    console.log(this.state.inventoryList.filter(item => item.id === id));
  }

  render() {
    return (
      <div className='container'>
        <div className="row my-3">
          <h2 className='menu-heading'>Inventory List</h2>
        </div>
        <div className="d-flex flex-row flex-lg-row flex-column-reverse">
          <InventoryTable inventory={this.state.inventoryList}/>
          <ItemForm onSubmit = {this.addItem}/>
        </div>
      </div>);
  }
}

export default InventoryList;
