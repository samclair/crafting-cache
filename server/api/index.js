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
app.delete('/api/categories', deleteCategory);

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
    query(sql, async (err, result) => {
      if (err) {
        console.error(err);
      } else {
        res.status(202).send(await getInventoryInfo(result.insertId));
      }
    }).catch(err => {
      if (err) console.error(err);
    });
  }
}

async function getInventoryInfo(categoryId) {
  const sql = `
  SELECT\`c\`.\`categoryName\`, \`c\`.\`categoryId\`, COUNT(\`itemName\`) as inventoryCount
  FROM\`categories\` AS\`c\`
  LEFT JOIN\`inventory\` AS\`i\`
  ON\`i\`.\`categoryId\` = \`c\`.\`categoryId\`
  WHERE\`c\`.\`categoryId\` = ${categoryId}
  GROUP BY\`c\`.\`categoryId\``;
  const results = await query(sql).catch(err => {
    if (err) console.error(err);
  });
  return results;
}

async function deleteCategory(req, res) {
  if (!req.body.categoryId) {
    res.status(400).send('Category ID is required');
  } else {
    const sql = ` DELETE
  FROM\`categories\`
  WHERE\`categories\`.\`categoryId\` = '${req.body.categoryId}'`;
    await query(sql).catch(err => {
      if (err) console.error(err);
    });
    res.status(200).send('Category Deleted');
  }
}

const PORT = process.env.PORT || 4000;

// eslint-disable-next-line no-console
app.listen(4000, () => console.log(`Listening on port ${PORT}`));
