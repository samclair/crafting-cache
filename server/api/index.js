const express = require('express');
const mysql = require('mysql');
const util = require('util');
const config = require('./_config.js');

const app = express();
let connection = mysql.createConnection(config);
const query = util.promisify(connection.query).bind(connection);

app.use(express.json());

app.get('/api/categories', getAllCategories);
app.post('/api/categories', addCategory);

async function getAllCategories(req, res) {
  const sql = `
  SELECT\`c\`.\`categoryName\`, \`c\`.\`categoryId\`, COUNT(\`itemName\`) as inventoryCount
  FROM\`categories\` AS\`c\`
  LEFT JOIN\`inventory\` AS\`i\`
  ON\`i\`.\`categoryId\` = \`c\`.\`categoryId\`
  WHERE\`c\`.\`userId\` = 1
  GROUP BY\`c\`.\`categoryId\``;
  const results = await query(sql).catch(err => {
    if (err) console.error(err);
  });
  res.send(results);
}

async function addCategory(req, res) {
  if (!req.body.categoryName) {
    res.status(400).send('Category name is required');
  } else {
    const sql = `INSERT INTO \`categories\` (\`categoryId\`, \`categoryName\`, \`userId\`)
  VALUES (NULL, '${req.body.categoryName}', '1')`;
    await query(sql).catch(err => {
      if (err) console.error(err);
    });
    res.status(201).send('Category Created');
  }
}

const PORT = process.env.PORT || 4000;

// eslint-disable-next-line no-console
app.listen(4000, () => console.log(`Listening on port ${PORT}`));
