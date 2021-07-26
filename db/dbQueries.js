const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection
    }
    findEmp() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        )
        ['test', 'test1', 'test2']
    }
}
module.exports = new DB(connection);
//`DELETE FROM ?? WHERE ?? = ?` 

// DB.query(`DELETE FROM employees WHERE id = ?`, 3, (err, result) => {
//     if (err) {
//         console.log(err);
    
//     }
//     console.log(result);
// })