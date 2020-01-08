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
    this.addGrade = this.addGrade.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
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

  deleteGrade(id) {
    const fetchConfig = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    };
    var newGrades = this.state.grades.filter(grade => grade.id !== id);
    fetch('api/grades', fetchConfig)
      .then(() => this.setState({ grades: newGrades }))
      .catch(error => console.error(error.message));
  }

  componentDidUpdate() {
    // eslint-disable-next-line no-console
    console.log(this.state.grades);
  }

  render() {
    return (
      <div className='container'>
        <Header text="Student Grade Table" averageGrade = {this.getAverageGrade()}/>
        <div className="d-flex flex-row flex-md-row flex-column-reverse">
          <GradeTable grades = {this.state.grades} deleteGrade = {this.deleteGrade}/>
          <GradeForm onSubmit = {this.addGrade}/>
        </div>
      </div>
    );
  }
}

export default App;
