<?php

$link = get_db_link();

if ($request['method'] === 'GET') {
  $category = $request['query']['category'];
  if(!isset($category)){
    throw new ApiError("Missing category from query param");
  }
  $response['body'] = get_category_inventory($link,$category);
  send($response);
}

function get_category_inventory($link,$category)
{
  $sql = "
  SELECT `i`.`itemName` as `name`,
  `i`.`itemId` as `id`,
  CONCAT(`i`.`unitId`,' ',`u`.`unitName`) as `amount`,
  `i`.`notes`
  FROM `inventory` AS `i`
  JOIN `units` AS `u` ON `u`.`unitId` = `i`.`unitId`
  JOIN `categories` AS `c` ON `c`.`categoryId`=`i`.`categoryId`
  WHERE `i`.`userId` = 1 AND `c`.`categoryName` = '{$category}'";
  $result = mysqli_query($link, $sql);
  return mysqli_fetch_all($result, MYSQLI_ASSOC);
}
