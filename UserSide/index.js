const inquirer = require('inquirer');

const promptMain = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: 'Good day sir, what can I do for you?',
            choices: ['View all Departments', 'View all roles', 'View all Emplloyees', 'Add a department', 'Add a role', 'Add an Employee', 'Update an Employee']
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
                case 'View all Emplloyees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    viewDepts();
                    break;
                case 'Add a role':
                    viewRoles();
                    break;
                case 'Add an Employee':
                    viewEmployees();
                    break;
                case 'Update an Employee':
                    viewEmployees();
                    break;
                default:
                    console.log('Did not match any cases')
            }
        })
}