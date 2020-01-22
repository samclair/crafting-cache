import React from 'react';
import Navbar from './navbar';
import CategoryList from './category-list';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'categories',
        params: {}
      },
      grades: []
    };
    this.addGrade = this.addGrade.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.menuItems = ['All Inventory', 'Categories'];
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
    const gradesArr = this.state.grades.map(gradeRow => Number(gradeRow.grade));
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

  render() {
    let pageDisplay = null;
    if (this.state.view.name === 'categories') {
      pageDisplay = <CategoryList/>;
    }
    return (
      <>
        <Navbar text="CraftingCache" menuItems = {this.menuItems}/>
        {pageDisplay}
      </>
    );
  }
}

export default App;
