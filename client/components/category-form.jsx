import React from 'react';
import FormInput from './form-input';
import InvalidInput from './invalid-input';

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: { input: '', isValid: false, isFocused: false },
      displayError: false,
      errorMessage: ''
    };
    this.textPattern = /^[A-Za-z \d,.':;"?]{3,64}$/;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleClear() {
    this.setState({
      category: { input: '' } });
    this.props.onCancel();
  }

  handleSubmit(event) {
    event.preventDefault();
    const category = this.state.category;
    if (category.input.match(this.textPattern)) {
      this.props.onSubmit({
        category: category.input.trim()
      });
      this.handleClear();
    } else {
      this.displayError();
    }
  }

  handleChange(event) {
    const input = event.target.value;
    const isValid = this.textPattern.test(input);
    if (input.length > 64) {
      return;
    }
    this.setState({
      [event.target.name]: { input: input, isValid: isValid, isFocused: true },
      displayError: false
    });
  }

  displayError() {
    let error = '';
    if (this.state.category.input.length < 3) {
      error = 'Error: Category name must be at least 3 characters.';
    } else {
      error = 'Error: Category cannot include special characters';
    }
    this.setState({
      errorMessage: error,
      displayError: true
    });
  }

  handleBlur(event) {
    let field = event.target.name;
    this.setState({ [field]: {
      input: this.state[field].input,
      isValid: this.state[field].isValid,
      isFocused: false } }, () => { if (!this.state[field].isValid) this.displayError(); });
  }

  render() {
    const errorMessage = this.state.displayError ? <InvalidInput text={this.state.errorMessage} /> : null;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div>Category Name</div>
          <FormInput
            handleChange = {this.handleChange}
            handleBlur = {this.handleBlur}
            symbol = "fa-book"
            fieldName = "category"
            fieldValue = {this.state.category}
          />
          {errorMessage}
          <button type="submit" onClick={this.handleSubmit} className="btn btn-success mr-1">Add</button>
          <button type="button" onClick={this.handleClear} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    );
  }
}

export default CategoryForm;
