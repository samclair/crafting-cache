import React from 'react';
import CategoryCard from './category-card';
import CategoryForm from './category-form';
import Button from './button';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: { showForm: false, showButton: true },
      categoryList: []
    };
    this.addCategory = this.addCategory.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  componentDidMount() {
    this.getCategories();
  }

  addCategory(categoryName) {
    const fetchConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryName)
    };
    fetch('api/categories', fetchConfig)
      .then(res => res.json())
      .then(category => this.setState({
        categoryList: this.state.categoryList.concat(category) })
      );
  }

  getCategories() {
    fetch('api/categories')
      .then(res => res.json())
      .then(categories => this.setState({ categoryList: categories }));
  }

  deleteCategory(category) {
    const fetchConfig = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: category })
    };
    var newCategories = this.state.categoryList.filter(category => category.categoryName !== category);
    fetch('api/caetgory', fetchConfig)
      .then(() => this.setState({ categoryList: newCategories }))
      .catch(error => console.error(error.message));
  }

  showForm() {
    this.setState({ view: { showForm: true, showButton: false } });
  }

  hideForm() {
    this.setState({ view: { showForm: false, showButton: true } });
  }

  render() {
    let categoryForm = this.state.view.showForm ? <CategoryForm onCancel = {this.hideForm} onSubmit = {this.addCategory}/> : null;
    let formButton = this.state.view.showButton ? <Button handleClick={this.showForm} text='Add Category' /> : null;
    let categoryCards = this.state.categoryList.length ? this.state.categoryList.map(category => {
      return <CategoryCard categoryName = {category.categoryName} key = {category.categoryName}/>;
    }) : <div>You do not currently have any categories :(</div>;
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
