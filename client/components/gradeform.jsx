import React from 'react';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: ''
    };
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
    let textPattern = /^[A-Za-z \d]{2,64}$/;
    let numberPattern = /^[\d]{1,2}$|^100$/;
    if (this.state.name.match(textPattern) && this.state.course.match(textPattern) && this.state.grade.match(numberPattern)) {
      this.props.onSubmit(this.state);
      this.handleClear();
    }
  }

  handleChange(event) {
    var input = event.target.value;
    this.setState({ [event.target.name]: input });
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
            <input pattern="[A-Za-z]" title="Alphanumeric Name" onChange={this.handleChange} value = {this.state.name} name="name"className="form-control" type="text" placeholder="Name" />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fas fa-book"></i>
              </div>
            </div>
            <input onChange={this.handleChange} value = {this.state.course} name="course"className="form-control" type="text" placeholder="Course"/>
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fas fa-percent"></i>
              </div>
            </div>
            <input onChange={this.handleChange} value = {this.state.grade} name="grade"className="form-control" type="text" placeholder="Grade"/>
          </div>
          <button type="submit" onClick={this.handleSubmit} className="btn btn-success mr-1">Add</button>
          <button type="button" onClick={this.handleClear} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    );
  }
}

export default GradeForm;
