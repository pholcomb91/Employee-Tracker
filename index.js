const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
const { response } = require('express');
const { json } = require('body-parser');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

const promptMain = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: 'What can I do for you?',
            choices: ['View all Departments', 'View all roles', 'View all Employees', 'Add a department', 'Add a role', 'Add an Employee', 'Update an Employee'],
        },
    ])
        .then((choice) => {
            switch (choice.name) {
                case 'View all Departments':
                    viewDepts();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all Employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDept();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an Employee':
                    addEmployee();
                    break;
                case 'Update an Employee':
                    updateEmployee();
                    break;
                default:
                    console.log('Did not match any cases')
            }
        })
};
const viewDepts = () => {
    const sql = 'SELECT * FROM departments'
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log("\n")
        console.table(rows);
    });
    inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: 'What would you like to do?',
            choices: ['Return to main menu', 'Quit']
        },
    ])
        .then((choice) => {
            switch (choice.name) {
                case 'Return to main menu':
                    promptMain();
                    break;
                case 'Quit':
                    process.exit();
            }
        })

}
const viewRoles = () => {
    const sql = 'SELECT * FROM roles JOIN departments ON roles.department_id = departments.id'
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(res);
    });

    promptMain();
}
const viewEmployees = () => {
    const sql = 'SELECT * FROM employees';
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("\n");
            console.table(res);
        }
    });

    promptMain();
}
const addDept = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the department you would like to add?",
        },
    ])
        .then((response) => {
            const deptName = response;
            const sql = `INSERT INTO departments SET ?`;
            console.log(deptName)
            db.query(sql, deptName, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Department Added!")
                }
            })
        })
}
const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the name of the role you would like to add?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role you would like to add?",
        },
        {
            type: "input",
            name: "department_id",
            message: "What department(ID) would you like to add this role to?",
        },
    ])
        .then((response) => {
            const newRole = response;
            const sql = 'INSERT INTO roles SET ?';
            db.query(sql, newRole, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`You have successfully added ${response.title} into Roles`)

                }
            });
        });
    promptMain();
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the first name of the employee you would like to add?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the last name of the employee you would like to add?",
        }])
        .then(res => {
            var newEmployee = res;
            const sql = 'SELECT * FROM roles'
            db.query(sql, (err, returnRoles) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    var roleOptions = returnRoles.map((role) => (
                        { name: role.title, value: role.id }
                    ))
                    console.log("roleOptions", roleOptions);
                    inquirer.prompt(
                        {
                            type: "list",
                            name: "role_id",
                            message: "Which Role will they be taking?",
                            choices: roleOptions,
                        }
                        )   
                        .then(resRole => {
                            var newEmpRole = resRole;
                            const sql2 = 'SELECT * FROM employees'
                            db.query(sql2, (err, returnEmps) => {
                                if (err) {
                                    console.log(err);
                                    return;
                                } else {
                                    var manager = returnEmps.map((employee) => (
                                        { name: `${employee.first_name} ${employee.last_name}`, value: employee.id }
                                    ))
                                    console.log("manager", manager);
                                    inquirer.prompt(
                                        {
                                            type: "list",
                                            name: "manager_id",
                                            message: "Who will be their manager?",
                                            choices: manager,
                                        }
                                    )
                                        .then(resMan => {
                                            var newEmployee = resMan;
                                            const sql = 'INSERT INTO employees SET ?';
                                            console.log(newEmployee)
                                            db.query(sql, newEmployee, (err, result) => {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    console.log(`${first_name} has been added to Employees.`)
                                                }
                                            });
                                        })
                                }

                            })
                        })
                }
            })
        })
}
const updateEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "What is the ID of the employee you would like to update?",
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the ID of the NEW role they will be taking on?",
        },
    ])
        .then((response) => {
            const newEmployee = response;
            const sql = `UPDATE employees SET ? WHERE ${newEmployee.id} = employees.id`
            db.query(sql, newEmployee, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Employee updated!");
                }
            });
        });
}

promptMain();