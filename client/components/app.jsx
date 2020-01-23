import React from 'react';
import Navbar from './navbar';
import CategoryList from './category-list';
import InventoryList from './inventory-list';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'inventory',
        params: {}
      }
    };
  }

  render() {
    let pageDisplay = null;
    if (this.state.view.name === 'categories') {
      pageDisplay = <CategoryList/>;
    } else if (this.state.view.name === 'inventory') {
      pageDisplay = <InventoryList/>;
    }
    return (
      <>
        <Navbar text="CraftingCache" menuItems = {this.menuItems}/>
        {pageDisplay}
      </>
    );
  }
}

export default App;
