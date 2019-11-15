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

  render() {
    return (
      <form>
        <input type="text"/>
        <input type="text"/>
        <input type="text"/>
      </form>
    );
  }
}

export default GradeForm;
