import React from 'react';
import Header from './header';
import GradeTable from './gradetable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
  }

  componentDidMount() {
    this.getAllGrades();
  }

  getAllGrades() {
    fetch('/api/grades')
      .then(value => value.json())
      .then(grades => this.setState({ grades }))
      .catch(error => console.error(error.message));
  }

  componentDidUpdate() {
    // eslint-disable-next-line no-console
    console.log(this.state.grades);
  }

  render() {
    return (
      <div>
        <Header text="Student Grade Table"/>
        <GradeTable grades = {this.state.grades}/>
      </div>
    );
  }
}

export default App;
