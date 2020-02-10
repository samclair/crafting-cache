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
    this.deleteCategory = this.deleteCategory.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.editCategory = this.editCategory.bind(this);
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

  deleteCategory(categoryId) {
    const fetchConfig = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoryId: categoryId })
    };
    fetch('api/categories', fetchConfig)
      .then(() => this.getCategories())
      .catch(error => console.error(error.message));
  }

  editCategory(categoryUpdate) {
    const fetchConfig = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryUpdate)
    };
    var oldCategoryIndex = this.state.categoryList.findIndex(category => category.categoryId === categoryUpdate.categoryId);
    let newCategories = this.state.categoryList.slice();
    newCategories[oldCategoryIndex] = categoryUpdate;
    fetch('api/categories', fetchConfig)
      .then(() => this.getCategories())
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
    let formButton = this.state.view.showButton ? <Button color='add-button' handleClick={this.showForm} symbol= 'fa-plus-square' text='Add Category' /> : null;
    let categoryCards = this.state.categoryList.length ? this.state.categoryList.map(category => {
      return (<CategoryCard
        handleDelete = {this.deleteCategory}
        handleClick = {this.props.handleNav}
        onSubmit = {this.editCategory}
        categoryName = {category.categoryName}
        categoryId = {category.categoryId}
        inventoryCount = {category.inventoryCount}
        key = {category.categoryId}/>);
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
