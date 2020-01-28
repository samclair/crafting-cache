<?php

$link = get_db_link();

if ($request['method'] === 'GET') {
  $response['body'] = get_all_categories($link);
  send($response);
}



if ($request['method'] === 'POST') {
  $category = $request['body']['category'];
  if (!isset($category)) {
    throw new ApiError("Missing category name", 400);
  }
  add_category($link, $category);
  $response['body'] = [
    'categoryName' => $category,
  ];
  send($response);
}

if ($request['method'] === 'DELETE'){
  $category = $request['body']['category'];
  if (!isset($category)) {
    throw new ApiError("Missing category name", 400);
  }
  delete_category($link, $category);
  $response['body'] = [
    'category' => 'deleted'
  ];
  send($response);
}

function delete_category($link, $category){
  $sql = "
  DELETE
  FROM `categories`
  WHERE `categories`.`categoryName`='$category'";
  mysqli_query($link, $sql);
}

function get_all_categories($link)
{
  $sql = "
  SELECT `categoryName`, `categoryId`
  FROM `categories`
  WHERE `userId`=1";
  $result = mysqli_query($link, $sql);
  return mysqli_fetch_all($result, MYSQLI_ASSOC);
}

function add_category($link, $category)
{
  $sql = "INSERT INTO `categories` (`categoryId`, `categoryName`, `userId`)
  VALUES (NULL, '$category', '1')";
  mysqli_query($link, $sql);
}
