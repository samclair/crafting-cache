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
    this.onBlur = this.onBlur.bind(this);
  }

  handleClear() {
    this.setState({
      name: '',
      course: '',
      grade: '' });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name.match(this.textPattern) &&
    this.state.course.match(this.textPattern) &&
    this.state.grade.match(this.numberPattern)) {
      this.props.onSubmit(this.state);
      this.handleClear();
    }
  }

  handleChange(event) {
    var input = event.target.value;
    var isValid = event.target.name ===
    'grade' ? event.target.value.match(this.numberPattern)
      : event.target.value.match(this.textPattern);
    this.setState({ [event.target.name]: { input: input, isValid: isValid, isFocused: true } });
  }

  onBlur(event) {
    this.setState({ [event.target.name]: { isFocused: false } });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <FormInput
            onChange = {this.handleChange}
            onBlur = {this.onBlur}
            symbol = "fa-user"
            name = "name"
            value = {this.state.name}
          />
          <FormInput
            onChange = {this.handleChange}
            onBlur = {this.onBlur}
            symbol="fa-book"
            name="course"
            value={this.state.course}
          />
          <FormInput
            onChange = {this.handleChange}
            onBlur = {this.onBlur}
            symbol = "fa-percent"
            name = "grade"
            value = {this.state.grade}
          />
          <button type="submit" onClick={this.handleSubmit} className="btn btn-success mr-1">Add</button>
          <button type="button" onClick={this.handleClear} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    );
  }
}

export default GradeForm;
