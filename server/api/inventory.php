<?php

$link = get_db_link();

if ($request['method'] === 'GET') {
  $category = $request['query']['category'];
  if(!isset($category)){
    throw new ApiError("Missing category from query param");
  }
  $response['body'] = get_category_inventory($link);
  send($response);
}

function get_category_inventory($link)
{
  $sql = "
  SELECT `itemName` as `name`, `itemId` as `id`, `unitId` as `amount`, `notes`
  FROM `inventory`
  WHERE `userId`=1";
  $result = mysqli_query($link, $sql);
  return mysqli_fetch_all($result, MYSQLI_ASSOC);
}
