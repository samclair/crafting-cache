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
  $new_category_id  = add_category($link, $category);
  $response['body'] = [
    'categoryName' => $category,
    'categoryId' => $new_category_id
  ];
  send($response);
}

if ($request['method'] === 'DELETE'){
  $category = $request['body']['categoryId'];
  if (!isset($category)) {
    throw new ApiError("Missing categoryId", 400);
  }
  delete_category($link, $category);
  $response['body'] = [
    'category' => 'deleted'
  ];
  send($response);
}

if ($request['method']=== 'PATCH'){
  $new_category_name = $request['body']['categoryName'];
  $category_id = $request['body']['categoryId'];
  update_category($link, $new_category_name, $category_id);
  $response['body'] = [
    'category' => 'updated'
  ];
  send($response);
}

function update_category($link, $category_name, $category_id){
  $sql = "UPDATE `categories`
  SET `categoryName` = '$category_name'
  WHERE `categories`.`categoryId` = '$category_id'";
  mysqli_query($link, $sql);
}

function delete_category($link, $category_id){
  $sql = "
  DELETE
  FROM `categories`
  WHERE `categories`.`categoryId`='$category_id'";
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
  return mysqli_insert_id($link);
}
