<?php

$link = get_db_link();

if ($request['method'] === 'GET'){
  $response['body'] = get_all_grades($link);
  send($response);
}

if ($request['method'] === 'POST') {
  $name = $request['body']['name'];
  $course = $request['body']['course'];
  $grade = $request['body']['grade'];
  if(!isset($name) && !isset($course) && !isset($grade)){
    throw new ApiError("Missing one or more fields for new student", 400);
  }
  add_grade($link, $name, $grade, $course);
  $response['body'] = [
    'name' => $name,
    'course' => $course,
    'grade' => $grade

];
  send($response);
}

if ($request['method'] === 'DELETE') {
  if(!isset($request['body']['id'])){
    throw new ApiError('Missing id to delete', 400);
  }
  delete_grade($link, $request['body']['id']);
  $response['body'] = [
    'message' => 'Student successfully deleted'
  ];
  send($response);
}

function get_all_grades($link){
  $sql = "
  SELECT *
  FROM `grades`";
  $result = mysqli_query($link,$sql);
  return mysqli_fetch_all($result, MYSQLI_ASSOC);

}

function delete_grade($link, $id){
  $sql = "
  DELETE
  FROM `grades`
  WHERE id = $id";
  mysqli_query($link, $sql);
}

function add_grade($link, $name, $grade, $course){
  $sql = "INSERT INTO `grades` (`name`, `grade`, `course`, `id`)
  VALUES ('$name', '$grade', '$course', NULL)";
  mysqli_query($link, $sql);
}
