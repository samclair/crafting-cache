import React from 'react';
import InventoryTable from './inventory-table';
import ItemForm from './item-form';

class InventoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryList: [],
      unitList: []
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    this.getTableData(this.props.categoryId);
  }

  getTableData(categoryId) {
    fetch(`api/inventory?categoryId=${categoryId}`)
      .then(res => res.json())
      .then(data => this.setState({ inventoryList: data.inventory, unitList: data.units }));
  }

  addItem(item) {
    item.categoryId = this.props.categoryId;
    const fetchConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };
    fetch('api/inventory', fetchConfig)
      .then(res => res.json())
      .then(inventory => this.setState({
        inventoryList: this.state.inventoryList.concat(item)
      })
      );
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
          <ItemForm unitList = {this.state.unitList} onSubmit = {this.addItem}/>
        </div>
      </div>);
  }
}

export default InventoryList;
