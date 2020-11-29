const express = require('express');
const app = express();
const db = require('./data/dbContext');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api/task', (req, res) => {
  const sql = "SELECT * FROM Task";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({error: err.message});
    }
    res.json(rows);
  })
});

app.post('/api/task', (req, res) => {
  const sql = "INSERT INTO Task (Description, Completed) VALUES (?, ?)";
  const {Description} = req.body;
  const params = [Description, false];
  db.run(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({error: err.message});
    }
    res.send("Task saved");
  })
})

const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 8080;

app.listen(PORT, () => {
  console.log(`Server listening in port: ${PORT}`);
})


