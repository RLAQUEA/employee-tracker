const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

function getAllInfo() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'userInput',
            message: 'What would you like to do?',
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"]
        }
    ]).then(response => {
        switch (response.userInput) {
            case "View All Employees":
                viewEmp();
                break;
            case "Add Employee":
                addEmp();
                break;
            case "Update Employee Role":
                updateRole();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "View All Departments":
                viewDepts();
                break;
            case "Add Department":
                addDept();
            default:
        }
        console.table(getAllInfo);
    }
    )
}