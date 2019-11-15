import React from 'react';
import Header from './header';
import GradeTable from './gradetable';
import GradeForm from './gradeform';

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

  addGrade(grade) {
    const fetchConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(grade)
    };
    fetch('api/grades', fetchConfig)
      .then(res => res.json())
      .then(grade => this.setState({ grades: this.state.grades.concat(grade) }));
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
        <GradeForm/>
      </div>
    );
  }
}

export default App;
