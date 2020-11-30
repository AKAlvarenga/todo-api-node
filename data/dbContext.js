const sqlite3 = require('sqlite3').verbose();
const {open} = require('sqlite');

let db = new sqlite3.Database('todo.db', (err) => {
  if (err) {
    console.error(err.message);
    //throw err;
  } else {
    console.log('Connected to the SQLite database');
    db.run(`CREATE TABLE Task (
        id INTEGER not null primary key autoincrement,
        description TEXT,
        completed   INTEGER not null
      )`, (err) => {
      if (err) {
        console.log('Table already exists');
      } else {

      }
    })
  }
});

module.exports = db;
