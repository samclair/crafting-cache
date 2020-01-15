import React from 'react';
import FormInput from './forminput';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { input: '', isValid: false, isFocused: false },
      course: { input: '', isValid: false, isFocused: false },
      grade: { input: '', isValid: false, isFocused: false }
    };
    this.textPattern = /^[A-Za-z \d]{3,64}$/;
    this.numberPattern = /^[\d]{1,2}$|^100$/;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleClear() {
    this.setState({
      name: { input: '' },
      course: { input: '' },
      grade: { input: '' } });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name.input.match(this.textPattern) &&
    this.state.course.input.match(this.textPattern) &&
    this.state.grade.input.match(this.numberPattern)) {
      this.props.onSubmit({
        name: this.state.name.input,
        course: this.state.course.input,
        grade: this.state.grade.input
      });
      this.handleClear();
    }
  }

  handleChange(event) {
    var input = event.target.value;
    var isValid = event.target.name === 'grade' ? this.numberPattern.test(input) : this.textPattern.test(input);
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
            symbol = "fa-user"
            fieldName = "name"
            fieldValue = {this.state.name}
          />
          <FormInput
            handleChange = {this.handleChange}
            handleBlur = {this.handleBlur}
            symbol = "fa-book"
            fieldName = "course"
            fieldValue = {this.state.course}
          />
          <FormInput
            handleChange = {this.handleChange}
            handleBlur = {this.handleBlur}
            symbol = "fa-percent"
            fieldName = "grade"
            fieldValue = {this.state.grade}
          />
          <button type="submit" onClick={this.handleSubmit} className="btn btn-success mr-1">Add</button>
          <button type="button" onClick={this.handleClear} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    );
  }
}

export default GradeForm;
