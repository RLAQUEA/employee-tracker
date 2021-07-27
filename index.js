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
                quitApp();
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
                break;
        }
        console.log("Added employee to database");
    }
    )
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


//Update role info in database 
// inquirer prompt to map thru emp first names, 
// "choose emp to update"

// const updateEmp = response.(name of inquirer prompt) 
// res.map (employee => employee.first_name)

// "choose role for employee"
// res.map (role => role.title) 
// const chosenRole = res.find(role => role.title === response.role_id)
// now do connection query to update emp SET ? WHERE first_name = updateEmp {
// role_id: chosenRole.id



// View all roles in database 

async function viewRoles() {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err
        console.table(res);
        getAllInfo();
    })
}


//Add new role to database

async function addRole () {
    connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err
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
            message: 'What is the department for this role?',
            choices: res.map(department => department.department_id)
        },
    ]).then(response => {
        const newRole = res.find(department => department.role_id === response.role_id)
        console.log("Added role to database");
    }
    )
},


//Update role info in database 

async function updateRole() {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err
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
                connection.query('SET ? WHERE first_name = updateEmp', {
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

            // async function viewDepts() {
            //     connection.query('SELECT * FROM department', (err, res) => {
            //         if (err) throw err
            //         console.table(res);
            //         getAllInfo();
            //     }
            //     )
            // }

            //Add new department to database 


            // const NewDeptInfo = () => {
            //     inquirer.prompt([
            //         {
            //             type: 'input',
            //             name: 'department',
            //             message: 'Enter new department name:'
            //         },
            //     ]).then(response => {
            //         switch (response.userInput) {
            //             case "Add Department":
            //             default:
            //                 addDept();
            //                 break;
            //         }
            //         console.log("Added department to database");
            //     }
            //     )
            // }
            // async function addDept() {
            //     let employees = await db.findEmp();
            //     try {
            //     } catch (error) {
            //         error.message;
            //     }
            //     console.table(employees);
    )}
