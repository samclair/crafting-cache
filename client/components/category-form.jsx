import React from 'react';
import FormInput from './form-input';
import InvalidInput from './invalid-input';

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: { input: '', isValid: false, isFocused: false },
      isSubmitted: false,
      errorMessage: ''
    };
    this.textPattern = /^[A-Za-z \d]{3,64}$/;
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
    const categoryInput = this.state.category.input;
    if (categoryInput.match(this.textPattern)) {
      this.props.onSubmit({
        category: categoryInput
      });
      this.handleClear();
    } else if (categoryInput.length < 3) {
      this.setState({
        errorMessage: 'Error: Category name must be at least 3 characters.',
        isSubmitted: true });
    } else if (categoryInput.length > 64) {
      this.setState({
        errorMessage: 'Error: Category name must not exceed 64 characters.',
        isSubmitted: true });
    } else {
      this.setState({
        errorMessage: 'Error: Category name must be alphanumeric characters only.',
        isSubmitted: true });
    }
  }

  handleChange(event) {
    const input = event.target.value;
    const isValid = this.textPattern.test(input);
    this.setState({
      [event.target.name]: { input: input, isValid: isValid, isFocused: true },
      isSubmitted: false
    });
  }

  handleBlur(event) {
    let field = event.target.name;
    this.setState({ [field]: { input: this.state[field].input, isValid: this.state[field].isValid, isFocused: false } });
  }

  render() {
    const submitMessage = !this.state.category.isValid && this.state.isSubmitted ? <InvalidInput text={this.state.errorMessage} /> : null;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <FormInput
            handleChange = {this.handleChange}
            handleBlur = {this.handleBlur}
            symbol = "fa-book"
            fieldName = "category"
            fieldValue = {this.state.category}
          />
          {submitMessage}
          <button type="submit" onClick={this.handleSubmit} className="btn btn-success mr-1">Add</button>
          <button type="button" onClick={this.handleClear} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    );
  }
}

export default CategoryForm;
