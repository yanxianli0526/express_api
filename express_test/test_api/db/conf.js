var mysql = require("mysql");
var con = mysql.createConnection(
    host= "127.0.0.1",
    port= '3306',
    user= "root",
    database= "starbucks",
    password= "yang108!"
);

con.connect(function (err) {
    if (err) {
        console.log('connecting error');
        return;
    }
    console.log('connecting success');
});
