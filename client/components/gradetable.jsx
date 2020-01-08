/* eslint-disable no-unused-vars */
import React from 'react';

function Grade(props) {
  const grade = props.grade;
  return (
    <tr id = {grade.id}>
      <td scope = 'row'>{grade.name}</td>
      <td>{grade.course}</td>
      <td>{grade.grade}</td>
      <td className = "align-middle">
        <button className = "btn btn-danger" onClick = {() => props.deleteGrade(grade.id)}>Delete</button>
      </td>
    </tr>
  );
}

function GradeTable(props) {
  return (
    <table className="mx-md-4 table table-striped table-header col-sm-11 col-md-7 table-bordered">
      <thead>
        <tr>
          <th scope = 'col'>Name</th>
          <th scope = 'col'>Course</th>
          <th scope = 'col'>Grade</th>
          <th scope='col'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {
          props.grades.map(grade => {
            return <Grade key = {grade.id} grade = {grade} deleteGrade = {props.deleteGrade} />;
          })
        }
      </tbody>
    </table>
  );
}

export default GradeTable;
