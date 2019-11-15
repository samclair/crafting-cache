/* eslint-disable no-unused-vars */
import React from 'react';

function Grade(props) {
  const grade = props.grade;
  return (
    <tr id = {grade.id}>
      <td scope = 'row'>{grade.name}</td>
      <td>{grade.course}</td>
      <td>{grade.grade}</td>
    </tr>
  );
}

function GradeTable(props) {
  return (
    <table className="mx-4 table table-striped col-7 table-bordered">
      <thead>
        <tr>
          <th scope = 'col'>Student Name</th>
          <th scope = 'col'>Course</th>
          <th scope = 'col'>Grade</th>
        </tr>
      </thead>
      <tbody>
        {
          props.grades.map(grade => {
            return <Grade key = {grade.id} grade = {grade}/>;
          })
        }
      </tbody>
    </table>
  );
}

export default GradeTable;
