import React from 'react';
import CategoryCard from './category-card';
import CategoryForm from './category-form';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: { showForm: true },
      categoryList: ['Fabric', 'Paint', 'Glitter', 'Spandex', 'Rayon', 'Brushes']
    };
    this.addCategory = this.addCategory.bind(this);
  }

  addCategory(categoryName) {
    const fetchConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryName)
    };
    fetch('api/categories', fetchConfig)
      .then(res => res.json())
      .then(categoryName => this.setState({
        categoryList: this.state.grades.concat(categoryName),
        view: { showForm: false } }
      ));
  }

  getCategories() {
    // get request to backend to get categories from user
  }

  render() {
    let categoryForm = this.state.view.showForm ? <CategoryForm onSubmit = {this.addCategory}/> : null;
    let categoryCards = this.state.categoryList.map(category => {
      return <CategoryCard categoryName = {category} key = {category}/>;
    });
    return (
      <div className='container'>
        <h2 className = 'menu-heading my-2'>Category List</h2>
        {categoryForm}
        <div className="row d-flex justify-content-center">{categoryCards}</div>
      </div>);
  }
}

export default CategoryList;
