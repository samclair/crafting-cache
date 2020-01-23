import React from 'react';
import Navbar from './navbar';
import CategoryList from './category-list';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'categories',
        params: {}
      }
    };
  }

  render() {
    let pageDisplay = null;
    if (this.state.view.name === 'categories') {
      pageDisplay = <CategoryList/>;
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
