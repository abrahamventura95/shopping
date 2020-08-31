require('dotenv').config();
var mysql = require('mysql');

exports.doQuery = function(sqlQuery, callback) {
  var con = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST             || 'localhost',
    user: process.env.DBuser           || 'root',
    password: process.env.DBPassword   || '',
    database: process.env.DBName       || 'shopping'
  });

  con.getConnection((err,connection) => {
    if (err) {callback(err);return;};
    con.query(sqlQuery, function (err, result) { 
      if (err){
        callback(err,402);
      } 
      else{
        callback(err,result);
      }
      if (connection) connection.release();
    });
  });
};