import React from 'react';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOn: false,
      categoryList: []
    };
  }

  addCategory() {
    // post request to backend, callback function to addCategory modal
  }

  getCategories() {
    // get request to backend to get categories from user
  }

  render() {
    let modal = null;
    let categoryCards = null;
    if (this.state.modalOn) {
      modal = <div>modal goes here</div>;
    }
    return (<div>Page goes here{modal}{categoryCards}</div>);
  }
}

export default CategoryList;
