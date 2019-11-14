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

  getAverageGrade() {
    if (!this.state.grades.length) {
      return 0;
    }
    const gradesArr = this.state.grades.map(grade => grade.grade);
    return Math.round(
      gradesArr.reduce(
        (total, num) => total + num
      ) / this.state.grades.length);
  }

  componentDidUpdate() {
    // eslint-disable-next-line no-console
    console.log(this.state.grades);
  }

  render() {
    return (
      <div>
        <Header text="Student Grade Table" averageGrade = {this.getAverageGrade()}/>
        <GradeTable grades = {this.state.grades}/>
      </div>
    );
  }
}

export default App;
