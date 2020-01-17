import React from 'react';
import CategoryCard from './category-card';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOn: false,
      categoryList: ['Fabric', 'Paint']
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
    let categoryCards = this.state.categoryList.map(category => {
      return <CategoryCard categoryName = {category} key = {category}/>;
    });
    if (this.state.modalOn) {
      modal = <div>modal goes here</div>;
    }
    return (<div className='container'>Page goes here{modal}{categoryCards}</div>);
  }
}

export default CategoryList;
