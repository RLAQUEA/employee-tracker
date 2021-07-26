const inquirer = require('inquirer');
const db = require('./db/dbQueries');
const mysql = require('mysql2');
const cTable = require('console.table');
const connection = require('./db/connection');

//Main menu of options
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
            case 'Quit':
                quitApp();
            default:
                getAllInfo();
        }
        console.table(getAllInfo);
    })
}
getAllInfo();


//View all employees in database
async function viewEmp() {
    let employees = await db.findEmp();
    try {
    } catch (error) {
        error.message;
    }
    console.table(employees);
}
viewEmp();



//Add new employee to database 
const addEmpInfo = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter employee\'s first name:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter employee\'s last name:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter employee\'s role:'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter employee\'s manager:'
        },
    ]).then(response => {
        switch (response.userInput) {
            case "Add Employee":
            default:
                addEmp();
                break;
        }
        console.log("Added employee to database");
    }
    )
}
addEmp();
async function addEmp() {
    let employees = await db.findEmp();
    try {
    } catch (error) {
        error.message;
    }
    console.table(employees);
}
addEmp(); 



//Update role info in database 
async function updateRole() {
    let employees = await db.findEmp();
    try {
    } catch (error) {
        error.message;
    }
    console.table(employees);
}
updateRole();


//View all roles in database 
async function viewRoles() {
    let employees = await db.findEmp();
    try {
    } catch (error) {
        error.message;
    }
    console.table(employees);
}
viewRoles();




//Add new role to database 
const addRoleInfo = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'input',
            name: 'department',
            message: 'What is the department for this role?'
        },
    ]).then(response => {
        switch (response.userInput) {
            case "Add Role":
            default:
                addRole();
                break;
        }
        console.log("Added role to database");
    }
    )
}
addRole();

async function addRole() {
    let employees = await db.findEmp();
    try {
    } catch (error) {
        error.message;
    }
    console.table(employees);
}
addRole();



//View all departments in database
async function viewDepts() {
    let employees = await db.findEmp();
    try {
    } catch (error) {
        error.message;
    }
    console.table(employees);
}
viewDepts();

//Add new department to database 
const NewDeptInfo = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter new department name:'
        },
    ]).then(response => {
        switch (response.userInput) {
            case "Add Department":
            default:
                addDept();
                break;
        }
        console.log("Added department to database");
    }
    )
}
addDept();
async function addDept() {
    let employees = await db.findEmp();
    try {
    } catch (error) {
        error.message;
    }
    console.table(employees);
}
addDept(); 
