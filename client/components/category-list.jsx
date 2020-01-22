import React from 'react';
import CategoryCard from './category-card';
import CategoryForm from './category-form';
import Button from './button';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: { showForm: false, showButton: true },
      categoryList: ['Fabric', 'Paint', 'Glitter', 'Spandex', 'Rayon', 'Brushes']
    };
    this.addCategory = this.addCategory.bind(this);
    this.showForm = this.showForm.bind(this);
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
        view: { showForm: false, showButton: true } }
      ));
  }

  getCategories() {
    // get request to backend to get categories from user
  }

  showForm() {
    this.setState({ view: { showForm: true, showButton: false } });
  }

  render() {
    let categoryForm = this.state.view.showForm ? <CategoryForm onSubmit = {this.addCategory}/> : null;
    let formButton = this.state.view.showButton ? <Button handleClick={this.showForm} text='Add Category' /> : null;
    let categoryCards = this.state.categoryList.map(category => {
      return <CategoryCard categoryName = {category} key = {category}/>;
    });
    return (
      <div className='container'>
        <div className="row my-3">
          <h2 className='menu-heading'>Category List</h2>
          <div className='offset-8'>
            {formButton}
          </div>
        </div>
        {categoryForm}
        <div className="row d-flex justify-content-center">{categoryCards}</div>
      </div>);
  }
}

export default CategoryList;
