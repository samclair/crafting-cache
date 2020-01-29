<?php

$link = get_db_link();

if ($request['method'] === 'GET') {
  $categoryId = $request['query']['categoryId'];
  if(!isset($categoryId)){
    throw new ApiError("Missing categoryId from query param");
  }
  $response['body'] = [
    "inventory" => get_category_inventory($link,$categoryId),
    "units" => get_units($link)
  ];
  send($response);
}
else if ($request['method'] === 'POST'){
  $itemName = $request['body']['itemName'];
  $amount = $request['body']['amount'];
  $unitId = $request['body']['unitId'];
  $categoryId = $request['body']['categoryId'];
  $notes = $request['body']['notes'];
  add_new_item($link, $itemName, $amount, $unitId, $categoryId,$notes);
  $response['body'] = [
    'message' => "Item successfully added"
  ];
  send($response);
}

function get_category_inventory($link,$categoryId){
  $sql = "
  SELECT `i`.`itemName` as `itemName`,
  `i`.`itemId` as `id`,
  CONCAT(`i`.`amount`,' ',`u`.`unitName`) as `amount`,
  `i`.`notes`
  FROM `inventory` AS `i`
  JOIN `units` AS `u` ON `u`.`unitId` = `i`.`unitId`
  JOIN `categories` AS `c` ON `c`.`categoryId`=`i`.`categoryId`
  WHERE `i`.`userId` = 1 AND `c`.`categoryId` = '{$categoryId}'";
  $result = mysqli_query($link, $sql);
  return mysqli_fetch_all($result, MYSQLI_ASSOC);
}

function get_units($link){
  $sql = "SELECT * from units";
  $result = mysqli_query($link, $sql);
  return mysqli_fetch_all($result, MYSQLI_ASSOC);
}

function add_new_item($link, $itemName, $amount, $unitId, $categoryId,$notes){
  $sql = "INSERT INTO `inventory`
  (`itemId`, `itemName`, `amount`, `userId`, `unitId`, `categoryId`, `notes`)
  VALUES
  (NULL,'$itemName', '$amount','1','$unitId','$categoryId','$notes')";
  mysqli_query($link, $sql);
}
