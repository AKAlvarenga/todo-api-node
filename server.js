const express = require('express');
const app = express();
const db = require('./data/dbContext');
const bodyParser = require("body-parser");
const cors = require('cors');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
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
  const sql = "INSERT INTO Task (description, completed) VALUES (?, ?)";
  const {description} = req.body;
  const params = [description, false];
  db.run(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({error: err.message});
    }
    res.send("Task saved");
  })
})

const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 8081;

app.listen(PORT, () => {
  console.log(`Server listening in port: ${PORT}`);
})


