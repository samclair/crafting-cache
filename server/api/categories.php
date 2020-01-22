<?php

$link = get_db_link();

if ($request['method'] === 'GET') {
  $response['body'] = get_all_categories($link);
  send($response);
}

if ($request['method'] === 'POST') {
  $category = $request['body']['category'];
  // if (!isset($category)) {
  //   throw new ApiError("Missing category name", 400);
  // }
  add_category($link, $category);
  $response['body'] = [
    'categoryName' => $category,
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

function add_category($link, $name)
{
  $sql = "INSERT INTO `categories` (`categoryId`, `categoryName`, `userId`)
  VALUES (NULL, '$name', '1')";
  mysqli_query($link, $sql);
}
