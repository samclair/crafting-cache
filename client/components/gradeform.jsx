import React from 'react';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: 0
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
    this.props.onSubmit(this.state);
    this.handleClear();
  }

  handleChange(event) {
    var input = event.target.name === 'grade' ? Number(event.target.value) : event.target.value;
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
            <input onChange={this.handleChange} name="name"className="form-control" type="text" placeholder="Name" />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fas fa-book"></i>
              </div>
            </div>
            <input onChange={this.handleChange} name="course"className="form-control" type="text" placeholder="Course"/>
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fas fa-percent"></i>
              </div>
            </div>
            <input onChange={this.handleChange} name="grade"className="form-control" type="text" placeholder="Grade"/>
          </div>
          <button type="submit" onClick={this.handleSubmit} className="btn btn-success mr-1">Add</button>
          <button type="reset" onClick={this.handleClear} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    );
  }
}

export default GradeForm;
