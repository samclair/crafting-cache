<?php

$link = get_db_link();

if ($request['method'] === 'GET') {
  $categoryId = $request['query']['categoryId'];
  if(!isset($categoryId)){
    throw new ApiError("Missing categoryId from query param");
  }
  $response['body'] = get_category_inventory($link,$categoryId);
  send($response);
}

function get_category_inventory($link,$categoryId){
  $sql = "
  SELECT `i`.`itemName` as `itemName`,
  `i`.`itemId` as `id`,
  CONCAT(`i`.`unitId`,' ',`u`.`unitName`) as `amount`,
  `i`.`notes`
  FROM `inventory` AS `i`
  JOIN `units` AS `u` ON `u`.`unitId` = `i`.`unitId`
  JOIN `categories` AS `c` ON `c`.`categoryId`=`i`.`categoryId`
  WHERE `i`.`userId` = 1 AND `c`.`categoryId` = '{$categoryId}'";
  $result = mysqli_query($link, $sql);
  return mysqli_fetch_all($result, MYSQLI_ASSOC);
}
