const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "userpassword",
  database: "mydatabase",
  port: 3306,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

module.exports = connection;
