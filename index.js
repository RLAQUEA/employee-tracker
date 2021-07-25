const inquirer = require('inquirer');
const db = require('./db/dbQueries');
const mysql = require('mysql2');
const cTable = require('console.table');
const connection = require('./db/connection');

//Inquirer prompts that gives list of options that the user can choose
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
getAllInfo();

const addEmp = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter first name:'
        },

        {
            type: 'input',
            name: 'last_name',
            message: 'Enter last name:'
        }, 
        {
            type: 'input',
            name: 'manager',
            message: 'Enter Manager of new employee:'
        }
    ]).then(response => {
        addEmp('first_name', );
    },

    async function addEmp() {
        let employees = await db.findEmp();
        try {
        } catch (error) {
            error.message;
        }
        console.table(employees);
    }
    addEmp();

    
    async function updateRole() {
        let employees = await db.findEmp();
        try {
        } catch (error) {
            error.message;
        }
        console.table(employees);
    }
    updateRole();

    async function viewRoles() {
        let employees = await db.findEmp();
        try {
        } catch (error) {
            error.message;
        }
        console.table(employees);
    }
    viewRoles();

    async function addRole() {
        let employees = await db.findEmp();
        try {
        } catch (error) {
            error.message;
        }
        console.table(employees);
    }
    addRole();
    async function viewDepts() {
        let employees = await db.findEmp();
        try {
        } catch (error) {
            error.message;
        }
        console.table(employees);
    }
    viewDepts();
    async function addDept() {
        let employees = await db.findEmp();
        try {
        } catch (error) {
            error.message;
        }
        console.table(employees);
    }
    addDept();
}