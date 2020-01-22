<?php

$link = get_db_link();

if ($request['method'] === 'GET') {
  $response['body'] = get_all_categories($link);
  send($response);
}

if ($request['method'] === 'POST') {
  $category = $request['body']['category'];
  $course = $request['body']['course'];
  $grade = $request['body']['grade'];
  if (!isset($category) && !isset($course) && !isset($grade)) {
    throw new ApiError("Missing category name", 400);
  }
  $gradeId = add_grade($link, $category, intval($grade), $course);
  $response['body'] = [
    'category' => $category,
    'course' => $course,
    'grade' => $grade,
    'id' => $gradeId
  ];
  send($response);
}

if ($request['method'] === 'DELETE') {
  if (!isset($request['body']['id'])) {
    throw new ApiError('Missing id to delete', 400);
  }
  delete_grade($link, $request['body']['id']);
  $response['body'] = [
    'message' => 'Student successfully deleted'
  ];
  send($response);
}

function get_all_categories($link)
{
  $sql = "
  SELECT `categoryName`
  FROM `categories`
  WHERE `userId`=1";
  $result = mysqli_query($link, $sql);
  return mysqli_fetch_all($result, MYSQLI_ASSOC);
}

function delete_grade($link, $id)
{
  $sql = "
  DELETE
  FROM `grades`
  WHERE id = $id";
  mysqli_query($link, $sql);
}

function add_grade($link, $name, $grade, $course)
{
  $sql = "INSERT INTO `grades` (`name`, `grade`, `course`, `id`)
  VALUES ('$name', '$grade', '$course', NULL)";
  mysqli_query($link, $sql);
  return mysqli_insert_id($link);
}
