import React from 'react';
import Navbar from './navbar';
import CategoryList from './category-list';
import InventoryList from './inventory-list';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'categories',
        params: {}
      }
    };
    this.switchView = this.switchView.bind(this);
  }

  switchView(viewName, viewParams) {
    this.setState({ view: { name: viewName, params: viewParams } });
  }

  render() {
    let pageDisplay = null;
    if (this.state.view.name === 'categories') {
      pageDisplay = <CategoryList handleNav = {this.switchView}/>;
    } else if (this.state.view.name === 'inventory') {
      pageDisplay = <InventoryList categoryId = {this.state.view.params.categoryId}/>;
    }
    return (
      <>
        <Navbar text="CraftingCache"
          menuItems = {this.menuItems}
          handleClick={this.switchView}/>
        {pageDisplay}
      </>
    );
  }
}

export default App;
