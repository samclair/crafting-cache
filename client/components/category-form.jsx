import React from 'react';
import FormInput from './forminput';

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: { input: '', isValid: false, isFocused: false }
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
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.category.input.match(this.textPattern)) {
      this.props.onSubmit({
        category: this.state.category.input
      });
      this.handleClear();
    }
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

  render() {
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
          <button type="submit" onClick={this.handleSubmit} className="btn btn-success mr-1">Add</button>
          <button type="button" onClick={this.handleClear} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    );
  }
}

export default CategoryForm;
