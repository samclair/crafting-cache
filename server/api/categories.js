let config = require('./_config.js');
const express = require('express');
let mysql = require('mysql');
const app = express();
let connection = mysql.createConnection(config);

app.listen(4000);
connection.connect(err => { if (err) throw err; });
app.get('/api/categories', getAllCategories);

function getAllCategories(req, res) {
  const sql = `
  SELECT\`c\`.\`categoryName\`, \`c\`.\`categoryId\`, COUNT(\`itemName\`) as inventoryCount
  FROM\`categories\` AS\`c\`
  LEFT JOIN\`inventory\` AS\`i\`
  ON\`i\`.\`categoryId\` = \`c\`.\`categoryId\`
  WHERE\`c\`.\`userId\` = 1
  GROUP BY\`c\`.\`categoryId\``;
  connection.query(sql, (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      res.send(results);
    }
  });
}
