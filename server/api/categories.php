<?php

$link = get_db_link();

if (!isset($_SESSION['user_id'])) {
  $user_id = create_user($link);
  $_SESSION['user_id'] = $user_id;
} else {
  $user_id = $_SESSION['user_id'];
}

if ($request['method'] === 'GET') {
  $response['body'] = get_all_categories($link, $user_id);
  send($response);
}

if ($request['method'] === 'POST') {
  $category = $request['body']['category'];
  if (!isset($category)) {
    throw new ApiError("Missing category name", 400);
  }
  $new_category_id  = add_category($link, $category, $user_id);
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

function get_all_categories($link, $user_id){
  $sql = "
  SELECT `i`.`categoryId`, `c`.`categoryName`, COUNT(*) as `inventoryCount`
  FROM `inventory` AS `i`
  INNER JOIN `categories` AS `c`
  ON `i`.`categoryId` = `c`.`categoryId`
  WHERE `i`.`userId` = $user_id
  GROUP BY `i`.`categoryId`";
  $result = mysqli_query($link, $sql);
  return mysqli_fetch_all($result, MYSQLI_ASSOC);
}

function add_category($link, $category, $user_id){
  $sql = "INSERT INTO `categories` (`categoryId`, `categoryName`, `userId`)
  VALUES (NULL, '$category', $user_id)";
  mysqli_query($link, $sql);
  return mysqli_insert_id($link);
}

function create_user($link){
  $sql = "INSERT INTO `users` (`createdAt`) VALUES (CURRENT_TIMESTAMP)";
  $link->query($sql);
  $cartId = mysqli_insert_id($link);
  return $cartId;
}
