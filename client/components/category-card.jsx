import React from 'react';
import Button from './button';
import FormInput from './form-input';

class CategoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: this.props.categoryName,
      view: 'info',
      category: { input: this.props.categoryName, isValid: true, isFocused: false },
      isDeleted: false,
      displayTimeout: null
    };
    this.textPattern = /^[A-Za-z \d]{3,64}$/;
    this.changeView = this.changeView.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentIsDeleted = this.componentIsDeleted.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
  }

  handleChange(event) {
    var input = event.target.value;
    var isValid = this.textPattern.test(input);
    this.setState({ [event.target.name]: { input: input, isValid: isValid, isFocused: true } });
  }

  handleBlur(event) {
    let field = event.target.name;
    this.setState({ [field]: { input: this.state[field].input, isValid: this.state[field].isValid, isFocused: false } });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.category.input.match(this.textPattern)) {
      this.props.onSubmit({
        categoryName: this.state.category.input,
        categoryId: this.props.categoryId
      });
      this.setState({ categoryName: this.state.category.input, view: 'info' });
    }
  }

  componentIsDeleted() {
    this.setState({ view: 'deleted',
      displayTimeout: setTimeout(() => { this.props.handleDelete(this.props.categoryId); this.setState({ isDeleted: true }); }, 2700) });
  }

  cancelDelete() {
    clearTimeout(this.state.displayTimeout);
    this.setState({
      view: 'info',
      displayTimeout: null
    });
  }

  changeView() {
    let newState = this.state.view === 'info' ? 'edit' : 'info';
    this.setState({ view: newState, category: { input: this.state.categoryName } });
  }

  render() {
    let cardHeader = this.state.view === 'info'
      ? <><h5 className="card-title mr-auto">{this.state.categoryName}</h5>
      <Button
        color='delete-button mb-auto align-self-left'
        symbol='fa-times'
        handleClick={this.componentIsDeleted } text='' />
      <Button
        color='add-button mb-auto ml-1'
        symbol='fa-pencil-alt'
        handleClick={this.changeView} text='' /></>
      : <form onSubmit = {this.handleSubmit}>
        <FormInput
          handleChange={this.handleChange}
          handleBlur={this.handleBlur}
          fieldName="category"
          fieldValue={this.state.category}
          optionalClass = "category-card-input"
        />
        <Button
          color='delete-button mb-auto align-self-left'
          symbol='fa-times'
          handleClick={this.changeView} text='' />
        <Button
          color='add-button mb-auto ml-1'
          symbol='fa-check'
          handleClick={this.handleSubmit} text='' /></form>;
    let card;
    if (this.state.isDeleted) {
      card = <div className='d-none'></div>;
    } else if (this.state.view === 'info' || this.state.view === 'edit') {
      card = (
        <div className="card mx-3 my-3"
          style={{ width: '18rem', 'userSelect': 'none' }}>
          <div className="card-body">
            <div className="container row d-flex align-items-center">
              {cardHeader}
            </div>
            <h6 className="card-subtitle mb-2 text-muted">Inventory Count: {this.props.inventoryCount}</h6>
            <a href='#'
              className="card-text pointer"
              onClick={() => this.props.handleClick('inventory', { categoryId: this.props.categoryId, categoryName: this.props.categoryName })}>View Inventory</a>
          </div>
        </div>);
    } else if (this.state.view === 'deleted') {
      card = (
        <div className="card mx-3 my-3 deleted-item"
          style={{ width: '18rem', 'userSelect': 'none' }}>
          <div className="card-body">
            <div className="container row d-flex align-items-center">
              <p>{`${this.props.categoryName} category and its ${this.props.inventoryCount} items have been deleted`}
                <br/><a className='pointer' onClick={this.cancelDelete}><u>Undo</u></a>
              </p>

            </div>
          </div>
        </div>);
    }
    return card;
  }
}

export default CategoryCard;
