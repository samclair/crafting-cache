import React from 'react';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { input: '', isValid: false },
      course: { input: '', isValid: false },
      grade: { input: '', isValid: false }
    };
    this.textPattern = /^[A-Za-z \d]{2,64}$/;
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
    if (this.state.name.match(this.textPattern) && this.state.course.match(this.textPattern) && this.state.grade.match(this.numberPattern)) {
      this.props.onSubmit(this.state);
      this.handleClear();
    }
  }

  handleChange(event) {
    var input = event.target.value;
    var isValid = event.target.name === 'grade' ? event.target.value.match(this.numberPattern) : event.target.value.match(this.textPattern);
    this.setState({ [event.target.name]: { input: input, isValid: isValid } });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="far fa-user"></i>
              </div>
            </div>
            <input
              title="Alphanumeric Student Name"
              onChange={this.handleChange}
              value={this.state.name.input}
              name="name"
              className={'form-control ' + (this.state.name.isValid ? 'is-valid' : 'is-invalid')}
              type="text"
              placeholder="Name" />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fas fa-book"></i>
              </div>
            </div>
            <input
              title="Alphanumeric Course Name"
              onChange={this.handleChange}
              value = {this.state.course.input}
              name="course"
              className={'form-control ' + (this.state.course.isValid ? 'is-valid' : 'is-invalid')}
              type="text"
              placeholder="Course"/>
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fas fa-percent"></i>
              </div>
            </div>
            <input
              title= "Grade Value (between 0-100)"
              onChange={this.handleChange}
              value={this.state.grade.input}
              name="grade"
              className={'form-control ' + (this.state.grade.isValid ? 'is-valid' : 'is-invalid')}
              type="text"
              placeholder="Grade"/>
          </div>
          <button type="submit" onClick={this.handleSubmit} className="btn btn-success mr-1">Add</button>
          <button type="button" onClick={this.handleClear} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    );
  }
}

export default GradeForm;
