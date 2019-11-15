import React from 'react';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: ''
    };
  }

  handleCancel() {

  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleInput() {

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
            <input className="form-control" type="text" placeholder="Name" />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="far fa-sticky-note"></i>
              </div>
            </div>
            <input className="form-control" type="text" placeholder="Course"/>
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fas fa-percentage"></i>
              </div>
            </div>
            <input className="form-control" type="text" placeholder="Grade"/>
          </div>
          <button type="submit" onClick={this.handleSubmit} className="btn btn-success mr-1">Add</button>
          <button type="button" onClick={this.handleCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    );
  }
}

export default GradeForm;
