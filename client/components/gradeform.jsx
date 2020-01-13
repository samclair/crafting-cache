import React from 'react';
import FormInput from './forminput';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { input: '', isValid: false },
      course: { input: '', isValid: false },
      grade: { input: '', isValid: false }
    };
    this.textPattern = /^[A-Za-z \d]{3,64}$/;
    this.numberPattern = /^[\d]{1,2}$|^100$/;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
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
    this.setState({ [event.target.name]: { input: input, isValid: isValid } });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <FormInput
            onChange = {this.handleChange}
            symbol = "fa-user"
            name = "name"
            value = {this.state.name}
          />
          <FormInput
            onChange={this.handleChange}
            symbol="fa-book"
            name="course"
            value={this.state.course}
          />
          <FormInput
            onChange = {this.handleChange}
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
