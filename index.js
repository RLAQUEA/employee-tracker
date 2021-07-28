const inquirer = require('inquirer');
const db = require('./db/dbQueries');
const mysql = require('mysql2');
const cTable = require('console.table');
const connection = require('./db/connection');
const { prompt } = require('inquirer');

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
            // quitApp();
            default:
                getAllInfo();
        }
    })
}
getAllInfo();


//View all employees in database
async function viewEmp() {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err
        console.table(res);
        getAllInfo();
    })
}


async function addEmp() {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Please enter first name of employee you\'d like to add:'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Please enter last name of employee you\'d like to add:'
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Select a role for this new employee:',
                choices: res.map(role => role.title)
            },
        ]).then(response => {
            const chosenRole = res.find(role => role.title === response.role_id)
            const employeeFirstName = response.first_name
            const employeeLastName = response.last_name
            connection.query('SELECT * FROM employee', (err, res) => {
                if (err) throw err
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'manager_id',
                        message: 'Select a manager for this employee:',
                        choices: res.map(manager => manager.first_name)
                    },
                ]).then(response => {
                    const chosenMgr = res.find(manager => manager.first_name === response.manager_id)
                    connection.query('INSERT INTO employee SET ?', {
                        first_name: employeeFirstName,
                        last_name: employeeLastName,
                        role_id: chosenRole.id,
                        manager_id: chosenMgr.id
                    }, function (err) {
                        if (err) throw err
                        console.log('Employee has been added');
                        getAllInfo();
                    }
                    )
                })
            })
        })

    })

}


// View all roles in database 
async function viewRoles() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err
        console.table(res);
        getAllInfo();
    })
}

// //Add new role to database
async function addRole() {
    //get all departments
    let departments = await connection.query('SELECT * FROM department')
    let newDept = departments.map(({ id, name }) => ({
        name: name,
        id: id
    }));
    //prompt user for name of role and salary
    let response = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Select the department for this role:',
            choices: newDept
        },
    ])
    console.log(response);

    let insertRole = await connection.query('INSERT INTO role SET ?', {
        title: response.title,
        salary: response.salary,
        department_id: response.departments
    })

    let department_id = await connection.query('SELECT * FROM department')
    for (let i = 0; i < department_id.length; i++) {
        console.log(department_id);
    }
    console.log(insertRole)
}

//Update role info in database 
async function updateRole() {
    connection.query('SELECT * FROM employee', (err, res) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'first_name',
                message: 'Choose an employee to update:',
                choices: res.map(employee => employee.first_name)
            },
        ]).then(response => {
            const chosenEmp = response.first_name
            res.map(employee => employee.first_name === response.first_name)
            if (err) throw err
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'role',
                    message: 'Update role for this employee:',
                    choices: res.map(role => role.title === response.role_id)
                },
            ]).then(response => {
                const chosenRole = res.find(role => role.title === response.role_id)
                connection.query('SET ? WHERE first_name = chosenRole', {
                    role_id: chosenRole.id
                }, function (err) {
                    if (err) throw err
                    console.log('Employee has been added');
                    getAllInfo();
                }
                )
            })
        })
    })

}

//View all departments in database
async function viewDepts() {
    connection.query('SELECT * FROM department', (err, res) => {
        console.table(res);
        getAllInfo();
    }
    )
}


//Add new department to database 
async function addDept() {
        let response = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter new department name:'
            }
            // console.table(response);
        ])
        let insertDept = await connection.query('INSERT INTO department SET ?', {
            name: response.name 
        }, function (err) {
            if (err) throw err
            console.log("Added department to database");
    }
    
)}

// quitApp();
