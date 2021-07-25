const mysql2 = require('mysql2');
const util = require('util');

const connection = mysql2.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'rootroot',
    database: 'employees'
})

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;