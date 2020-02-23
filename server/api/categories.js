const config = require('./_config.js');
const express = require('express');
const mysql = require('mysql');
const util = require('util');

const app = express();
let connection = mysql.createConnection(config);
const query = util.promisify(connection.query).bind(connection);

app.get('/api/categories', getAllCategories);

async function getAllCategories(req, res) {
  const sql = `
  SELECT\`c\`.\`categoryName\`, \`c\`.\`categoryId\`, COUNT(\`itemName\`) as inventoryCount
  FROM\`categories\` AS\`c\`
  LEFT JOIN\`inventory\` AS\`i\`
  ON\`i\`.\`categoryId\` = \`c\`.\`categoryId\`
  WHERE\`c\`.\`userId\` = 1
  GROUP BY\`c\`.\`categoryId\``;
  const results = await query(sql);
  res.send(results);
}
app.listen(4000);
