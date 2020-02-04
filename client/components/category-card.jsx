import React from 'react';
import Button from './button';
import FormInput from './form-input';

class CategoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: this.props.categoryName,
      view: 'info',
      category: { input: this.props.categoryName, isValid: true, isFocused: false }
    };
    this.textPattern = /^[A-Za-z \d]{3,64}$/;
    this.changeView = this.changeView.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        handleClick={() => (this.props.handleDelete(this.props.categoryId))} text='' />
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
        />
        <Button
          color='delete-button mb-auto align-self-left'
          symbol='fa-times'
          handleClick={this.changeView} text='' />
        <Button
          color='add-button mb-auto ml-1'
          symbol='fa-check'
          handleClick={this.handleSubmit} text='' /></form>;
    return (
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
  }
}

export default CategoryCard;
